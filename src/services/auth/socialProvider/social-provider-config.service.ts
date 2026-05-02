import { IConfigService } from '../../../shared/config/config.service.interface.js';
import {
  ISocialProvider,
  ISocialProviderConfig,
} from './social-provider-config.interface.js';

/**
 * Abstract base class for social provider
 */
abstract class AbstractSocialProvider implements ISocialProvider {
  abstract readonly id: string;
  abstract readonly name: string;

  constructor(protected configService: IConfigService) {}

  abstract isEnabled(): boolean;
  abstract getCredentials(): { clientId: string; clientSecret: string } | null;
  getScope?(): string[];
  getAuthorizationQuery?(): Record<string, string>;
  getEndpoints?(): {
    authorizationEndpoint: string;
    tokenEndpoint: string;
    userInfoEndpoint: string;
  };
}

/**
 * Discord OAuth provider
 */
class DiscordProvider extends AbstractSocialProvider {
  readonly id = 'discord';
  readonly name = 'Discord';

  isEnabled(): boolean {
    const env = this.configService.getAll();
    return !!(env.DISCORD_CLIENT_ID && env.DISCORD_CLIENT_SECRET);
  }

  getCredentials(): { clientId: string; clientSecret: string } | null {
    if (!this.isEnabled()) return null;

    const env = this.configService.getAll();
    return {
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    };
  }
}

/**
 * Google OAuth provider
 */
class GoogleProvider extends AbstractSocialProvider {
  readonly id = 'google';
  readonly name = 'Google';

  isEnabled(): boolean {
    const env = this.configService.getAll();
    return !!(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET);
  }

  getCredentials(): { clientId: string; clientSecret: string } | null {
    if (!this.isEnabled()) return null;

    const env = this.configService.getAll();
    return {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    };
  }
}

/**
 * Microsoft OAuth provider
 */
class MicrosoftProvider extends AbstractSocialProvider {
  readonly id = 'microsoft';
  readonly name = 'Microsoft';

  isEnabled(): boolean {
    const env = this.configService.getAll();
    return !!(env.MICROSOFT_CLIENT_ID && env.MICROSOFT_CLIENT_SECRET);
  }

  getCredentials(): {
    clientId: string;
    clientSecret: string;
    tenantId?: string;
  } | null {
    if (!this.isEnabled()) return null;

    const env = this.configService.getAll();
    return {
      clientId: env.MICROSOFT_CLIENT_ID,
      clientSecret: env.MICROSOFT_CLIENT_SECRET,
      tenantId: env.MICROSOFT_TENANT_ID,
    };
  }

  getScope(): string[] {
    return ['openid', 'profile', 'email', 'offline_access'];
  }
}

/**
 * Bluesky OAuth provider
 */
class BlueskyProvider extends AbstractSocialProvider {
  readonly id = 'bluesky';
  readonly name = 'Bluesky';

  isEnabled(): boolean {
    const env = this.configService.getAll();
    return !!env.BETTER_AUTH_URL;
  }

  getCredentials(): { clientId: string; clientSecret: string } | null {
    if (!this.isEnabled()) return null;

    const env = this.configService.getAll();
    return {
      clientId: `${env.BETTER_AUTH_URL}/api/bluesky/oauth/client-metadata.json`,
      clientSecret: '',
    };
  }

  getScope(): string[] {
    return ['atproto', 'transition:generic'];
  }

  getEndpoints(): {
    authorizationEndpoint: string;
    tokenEndpoint: string;
    userInfoEndpoint: string;
  } {
    return {
      authorizationEndpoint: 'https://bsky.social/oauth/authorize',
      tokenEndpoint: 'https://bsky.social/oauth/token',
      userInfoEndpoint: 'https://bsky.social/oauth/userinfo',
    };
  }
}

/**
 * Social provider configuration service
 * Aggregates all social providers and provides their configurations
 */
export class SocialProviderConfigService implements ISocialProviderConfig {
  private providers: ISocialProvider[];

  constructor(configService: IConfigService) {
    this.providers = [
      new DiscordProvider(configService),
      new GoogleProvider(configService),
      new MicrosoftProvider(configService),
      new BlueskyProvider(configService),
    ];
  }

  getProviders(): Record<
    string,
    {
      id: string;
      name: string;
      clientId: string;
      clientSecret: string;
      tenantId?: string;
      scope?: string[];
      authorizationQuery?: Record<string, string>;
      authorizationEndpoint?: string;
      tokenEndpoint?: string;
      userInfoEndpoint?: string;
    }
  > {
    const result: Record<
      string,
      {
        id: string;
        name: string;
        clientId: string;
        clientSecret: string;
        tenantId?: string;
        scope?: string[];
        authorizationQuery?: Record<string, string>;
        authorizationEndpoint?: string;
        tokenEndpoint?: string;
        userInfoEndpoint?: string;
      }
    > = {};

    for (const provider of this.providers) {
      const credentials = provider.getCredentials();
      if (credentials) {
        result[provider.id] = {
          id: provider.id,
          name: provider.name,
          ...credentials,
          scope: provider.getScope?.(),
          authorizationQuery: provider.getAuthorizationQuery?.(),
          ...provider.getEndpoints?.(),
        };
      }
    }

    return result;
  }

  isProviderEnabled(providerId: string): boolean {
    const provider = this.providers.find((p) => p.id === providerId);
    return provider ? provider.isEnabled() : false;
  }
}

/**
 * Factory function to create social provider config service
 * @param configService Configuration service instance
 * @returns Social provider config service instance
 */
export function socialProviderConfigFactory(
  configService: IConfigService,
): ISocialProviderConfig {
  return new SocialProviderConfigService(configService);
}
