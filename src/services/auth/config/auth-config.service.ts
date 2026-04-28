import { IConfigService } from '../../../shared/config/config.service.interface.js';
import type { ApiYamlConfig } from '../../../utils/config.util.js';
import { IAuthConfig } from './auth-config.interface.js';

export function authConfigFactory(
  configService: IConfigService,
  yaml: ApiYamlConfig['auth'],
): IAuthConfig {
  return {
    getTrustedOrigins(): string[] {
      const envOrigins =
        configService
          .getAll()
          .TRUSTED_ORIGINS?.split(',')
          .map((o) => o.trim()) ?? [];
      return Array.from(new Set([...yaml.trustedOrigins, ...envOrigins]));
    },

    getCookieDomain(): string {
      return configService.getAll().COOKIE_DOMAIN ?? yaml.cookieDomain;
    },

    getCrossSubDomainCookies(): { enabled: boolean; domain: string } {
      const domain = configService.getAll().COOKIE_DOMAIN ?? yaml.cookieDomain;
      return { enabled: domain !== '', domain };
    },

    getAllowedHeaders(): string {
      return 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
    },

    getCredentials(): boolean {
      return true;
    },

    getTrustedProxies(): string[] {
      const envProxies =
        configService
          .getAll()
          .TRUSTED_PROXIES?.split(',')
          .map((p) => p.trim()) ?? [];
      return Array.from(new Set([...yaml.trustedProxies, ...envProxies]));
    },
  };
}
