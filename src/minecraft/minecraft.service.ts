import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Logger,
  Inject,
} from '@nestjs/common';
import getPrisma from '../prisma.js';
import {
  xblResponseSchema,
  xstsResponseSchema,
  minecraftAuthResponseSchema,
  minecraftProfileResponseSchema,
} from './schemas/minecraft-api.schema.js';
import { IConfigService } from '../shared/config/config.service.interface.js';

@Injectable()
export class MinecraftService {
  private readonly logger = new Logger(MinecraftService.name);
  private prisma = getPrisma();

  constructor(
    @Inject(IConfigService) private readonly configService: IConfigService,
  ) {}

  private async getMicrosoftXboxToken(refreshToken: string): Promise<string> {
    const env = this.configService.getAll();
    const response = await fetch(
      `https://login.microsoftonline.com/${env.MICROSOFT_TENANT_ID}/oauth2/v2.0/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: env.MICROSOFT_CLIENT_ID || '',
          client_secret: env.MICROSOFT_CLIENT_SECRET || '',
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          scope: 'XboxLive.signin',
        }),
      },
    );

    if (!response.ok) {
      const errorBody = await response.text();
      throw new UnauthorizedException(
        `Failed to refresh Microsoft token: ${errorBody}`,
      );
    }

    const data = (await response.json()) as { access_token: string };
    return data.access_token;
  }

  async getMinecraftProfile(userId: string) {
    const account = await this.prisma.account.findFirst({
      where: {
        userId,
        providerId: 'microsoft',
      },
    });

    if (!account || !account.refreshToken) {
      throw new NotFoundException(
        'Microsoft account not linked or refresh token missing',
      );
    }

    try {
      const xboxAccessToken = await this.getMicrosoftXboxToken(
        account.refreshToken,
      );

      const xblResponse = await fetch(
        'https://user.auth.xboxlive.com/user/authenticate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            Properties: {
              AuthMethod: 'RPS',
              SiteName: 'user.auth.xboxlive.com',
              RpsTicket: `d=${xboxAccessToken}`,
            },
            RelyingParty: 'http://auth.xboxlive.com',
            TokenType: 'JWT',
          }),
        },
      );

      if (!xblResponse.ok) {
        const errorBody = await xblResponse.text();
        throw new UnauthorizedException(
          `Xbox Live authentication failed ${xblResponse.status} ${errorBody}`,
        );
      }

      const xblData = xblResponseSchema.parse(await xblResponse.json());
      const userHash = xblData.DisplayClaims.xui[0].uhs;

      const xstsResponse = await fetch(
        'https://xsts.auth.xboxlive.com/xsts/authorize',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            Properties: { SandboxId: 'RETAIL', UserTokens: [xblData.Token] },
            RelyingParty: 'rp://api.minecraftservices.com/',
            TokenType: 'JWT',
          }),
        },
      );

      if (!xstsResponse.ok) {
        const errorData = (await xstsResponse.json()) as { XErr?: number };
        if (errorData.XErr === 2148916238) {
          throw new UnauthorizedException(
            'The account does not have a Minecraft profile or the account is a child account',
          );
        }
        throw new UnauthorizedException('XSTS authentication failed');
      }

      const xstsData = xstsResponseSchema.parse(await xstsResponse.json());

      const mcAuthResponse = await fetch(
        'https://api.minecraftservices.com/authentication/login_with_xbox',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            identityToken: `XBL3.0 x=${userHash};${xstsData.Token}`,
          }),
        },
      );

      if (!mcAuthResponse.ok) {
        throw new UnauthorizedException('Minecraft authentication failed');
      }

      const mcAuthData = minecraftAuthResponseSchema.parse(
        await mcAuthResponse.json(),
      );

      const profileResponse = await fetch(
        'https://api.minecraftservices.com/minecraft/profile',
        {
          headers: { Authorization: `Bearer ${mcAuthData.access_token}` },
        },
      );

      if (!profileResponse.ok) {
        throw new NotFoundException('Minecraft profile not found');
      }

      const profileData = minecraftProfileResponseSchema.parse(
        await profileResponse.json(),
      );

      return {
        id: profileData.id,
        name: profileData.name,
        skinUrl: profileData.skins?.find((s) => s.state === 'ACTIVE')?.url,
      };
    } catch (error) {
      this.logger.error('Failed to fetch Minecraft profile', error);
      if (
        error instanceof UnauthorizedException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new UnauthorizedException(
        'An error occurred while fetching Minecraft profile',
      );
    }
  }
}
