import { Environment } from '@hashibutogarasu/common';
import { IConfigService } from '../../../shared/config/config.service.interface.js';
import { IAuthConfig } from './auth-config.interface.js';
import { AbstractPluginEnvironment } from '../../../shared/plugin/abstract-plugin-environment.js';

/**
 * Abstract base class for auth configuration
 * Handles environment variable merging and duplicate removal
 */
abstract class AbstractAuthConfig
  extends AbstractPluginEnvironment<IAuthConfig>
  implements IAuthConfig
{
  constructor(protected configService: IConfigService) {
    super();
  }

  resolve(): IAuthConfig {
    return this;
  }

  /**
   * Get default trusted origins for this environment
   * Override in subclasses to provide environment-specific defaults
   */
  protected abstract getDefaultTrustedOrigins(): string[];

  /**
   * Get default cookie domain for this environment
   * Override in subclasses to provide environment-specific defaults
   */
  protected abstract getDefaultCookieDomain(): string;

  /**
   * Get trusted origins, merging environment variables with defaults
   * Automatically removes duplicates
   */
  getTrustedOrigins(): string[] {
    const env = this.configService.getAll();
    const defaults = this.getDefaultTrustedOrigins();

    const envOrigins = env.TRUSTED_ORIGINS
      ? env.TRUSTED_ORIGINS.split(',').map((origin) => origin.trim())
      : [];

    const allOrigins = [...defaults, ...envOrigins];
    return Array.from(new Set(allOrigins));
  }

  /**
   * Get cookie domain, preferring environment variable over default
   */
  getCookieDomain(): string {
    const env = this.configService.getAll();
    return env.COOKIE_DOMAIN ?? this.getDefaultCookieDomain();
  }

  /**
   * Get cross-subdomain cookie configuration
   */
  getCrossSubDomainCookies(): { enabled: boolean; domain: string } {
    const domain = this.getCookieDomain();
    return {
      enabled: domain !== '',
      domain: domain,
    };
  }

  /**
   * Get allowed headers for CORS
   */
  getAllowedHeaders(): string {
    return 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
  }

  /**
   * Get whether to allow credentials for CORS
   */
  getCredentials(): boolean {
    return true;
  }

  /**
   * Get default trusted proxies for this environment
   */
  protected abstract getDefaultTrustedProxies(): string[];

  /**
   * Get trusted proxies, merging environment variables with defaults
   */
  getTrustedProxies(): string[] {
    const env = this.configService.getAll();
    const defaults = this.getDefaultTrustedProxies();

    const envProxies = env.TRUSTED_PROXIES
      ? env.TRUSTED_PROXIES.split(',').map((proxy) => proxy.trim())
      : [];

    const allProxies = [...defaults, ...envProxies];
    return Array.from(new Set(allProxies));
  }
}

/**
 * Production environment auth configuration
 * Only allows production domains by default
 */
class ProductionAuthConfig extends AbstractAuthConfig {
  protected getDefaultTrustedOrigins(): string[] {
    return [
      'https://api.karasu256.com',
      'https://sso.karasu256.com',
      'https://www.karasu256.com',
      'https://karasu256.com',
      'https://id.karasu256.com',
    ];
  }

  protected getDefaultCookieDomain(): string {
    return '.karasu256.com';
  }

  protected getDefaultTrustedProxies(): string[] {
    return [];
  }
}

/**
 * Development environment auth configuration
 * Allows localhost and production domains for testing
 */
class DevelopmentAuthConfig extends AbstractAuthConfig {
  protected getDefaultTrustedOrigins(): string[] {
    return ['http://localhost:3000', 'http://localhost:3001', 'http://192.168.0.5:3001'];
  }

  protected getDefaultCookieDomain(): string {
    return '';
  }

  protected getDefaultTrustedProxies(): string[] {
    return ['127.0.0.1', '::1'];
  }
}

/**
 * Test environment auth configuration
 * Only allows localhost for isolated testing
 */
class TestAuthConfig extends AbstractAuthConfig {
  protected getDefaultTrustedOrigins(): string[] {
    return ['http://localhost:3000', 'http://localhost:3001'];
  }

  protected getDefaultCookieDomain(): string {
    return '';
  }

  protected getDefaultTrustedProxies(): string[] {
    return ['127.0.0.1', '::1'];
  }
}

/**
 * Factory function to create auth config based on environment
 * @param configService Configuration service instance
 * @returns Auth config instance for current environment
 */
export function authConfigFactory(configService: IConfigService): IAuthConfig {
  return AbstractPluginEnvironment.resolve<
    IAuthConfig,
    AbstractAuthConfig,
    [IConfigService]
  >(
    {
      [Environment.PRODUCTION]: ProductionAuthConfig as new (
        configService: IConfigService,
      ) => AbstractAuthConfig,
      [Environment.DEVELOPMENT]: DevelopmentAuthConfig as new (
        configService: IConfigService,
      ) => AbstractAuthConfig,
      [Environment.TEST]: TestAuthConfig as new (
        configService: IConfigService,
      ) => AbstractAuthConfig,
    },
    configService,
  );
}
