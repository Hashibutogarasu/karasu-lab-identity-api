import { IConfigService } from '../../../shared/config/config.service.interface.js';
import { ISocialProvider, ISocialProviderConfig } from './social-provider-config.interface.js';

/**
 * Abstract base class for social provider
 */
abstract class AbstractSocialProvider implements ISocialProvider {
  abstract readonly id: string;

  constructor(protected configService: IConfigService) {}

  abstract isEnabled(): boolean;
  abstract getCredentials(): { clientId: string; clientSecret: string } | null;
}

/**
 * Discord OAuth provider
 */
class DiscordProvider extends AbstractSocialProvider {
  readonly id = 'discord';

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
 * X (formerly Twitter) OAuth provider
 */
class XProvider extends AbstractSocialProvider {
  readonly id = 'twitter'; // Better-auth uses 'twitter' as the provider ID

  isEnabled(): boolean {
    const env = this.configService.getAll();
    return !!(env.X_CLIENT_ID && env.X_CLIENT_SECRET);
  }

  getCredentials(): { clientId: string; clientSecret: string } | null {
    if (!this.isEnabled()) return null;

    const env = this.configService.getAll();
    return {
      clientId: env.X_CLIENT_ID,
      clientSecret: env.X_CLIENT_SECRET,
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
    // Initialize all available providers
    this.providers = [
      new DiscordProvider(configService),
      new GoogleProvider(configService),
      new XProvider(configService),
    ];
  }

  getProviders(): Record<string, { clientId: string; clientSecret: string }> {
    const result: Record<string, { clientId: string; clientSecret: string }> = {};

    for (const provider of this.providers) {
      const credentials = provider.getCredentials();
      if (credentials) {
        result[provider.id] = credentials;
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
  configService: IConfigService
): ISocialProviderConfig {
  return new SocialProviderConfigService(configService);
}
