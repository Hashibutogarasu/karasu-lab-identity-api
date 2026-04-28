import { describe, it, expect, afterEach } from 'vite-plus/test';
import { MockConfigService } from '../../../../test/mocks/config.service.mock.js';
import { authConfigFactory } from './auth-config.service.js';
import type { ApiYamlConfig } from '../../../utils/config.util.js';

const productionYaml: ApiYamlConfig['auth'] = {
  trustedOrigins: [
    'https://api.karasu256.com',
    'https://sso.karasu256.com',
    'https://www.karasu256.com',
    'https://karasu256.com',
    'https://id.karasu256.com',
    'android:apk-key-hash:SEhtZj8Q-Fb0z9qGqUpYG3s1PbYvmiwZHYqmXe3tVHc',
  ],
  cookieDomain: '.karasu256.com',
  trustedProxies: [],
};

const developmentYaml: ApiYamlConfig['auth'] = {
  trustedOrigins: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://192.168.0.5:3001',
  ],
  cookieDomain: '',
  trustedProxies: ['127.0.0.1', '::1'],
};

const testYaml: ApiYamlConfig['auth'] = {
  trustedOrigins: ['http://localhost:3000', 'http://localhost:3001'],
  cookieDomain: '',
  trustedProxies: ['127.0.0.1', '::1'],
};

describe('AuthConfigService', () => {
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  describe('authConfigFactory', () => {
    it('should use production yaml origins', () => {
      const configService = new MockConfigService(
        {
          NODE_ENV: 'production',
          BETTER_AUTH_URL: 'https://api.karasu256.com',
          BETTER_AUTH_SECRET: 'prod-secret',
        },
        'production',
      );

      const config = authConfigFactory(configService, productionYaml);
      const origins = config.getTrustedOrigins();

      expect(origins).toContain('https://api.karasu256.com');
      expect(origins).toContain('https://sso.karasu256.com');
      expect(origins).toContain('https://karasu256.com');
      expect(config.getCookieDomain()).toBe('.karasu256.com');
    });

    it('should use development yaml origins', () => {
      const configService = new MockConfigService(
        {
          NODE_ENV: 'development',
          BETTER_AUTH_URL: 'http://localhost:3001',
          BETTER_AUTH_SECRET: 'dev-secret',
        },
        'development',
      );

      const config = authConfigFactory(configService, developmentYaml);
      const origins = config.getTrustedOrigins();

      expect(origins).toContain('http://localhost:3000');
      expect(config.getCookieDomain()).toBe('');
    });
  });

  describe('getTrustedOrigins', () => {
    it('should merge environment variable origins with defaults', () => {
      const configService = new MockConfigService(
        {
          NODE_ENV: 'development',
          TRUSTED_ORIGINS: 'https://custom1.com,https://custom2.com',
          BETTER_AUTH_URL: 'http://localhost:3001',
          BETTER_AUTH_SECRET: 'dev-secret',
        },
        'development',
      );

      const config = authConfigFactory(configService, developmentYaml);
      const origins = config.getTrustedOrigins();

      expect(origins).toContain('http://localhost:3000');
      expect(origins).toContain('https://custom1.com');
      expect(origins).toContain('https://custom2.com');
    });

    it('should remove duplicate origins', () => {
      const configService = new MockConfigService(
        {
          NODE_ENV: 'development',
          TRUSTED_ORIGINS: 'http://localhost:3000,https://karasu256.com',
          BETTER_AUTH_URL: 'http://localhost:3001',
          BETTER_AUTH_SECRET: 'dev-secret',
        },
        'development',
      );

      const config = authConfigFactory(configService, developmentYaml);
      const origins = config.getTrustedOrigins();

      const uniqueOrigins = Array.from(new Set(origins));
      expect(origins.length).toBe(uniqueOrigins.length);
      expect(origins.filter((o) => o === 'http://localhost:3000')).toHaveLength(
        1,
      );
    });

    it('should handle empty TRUSTED_ORIGINS environment variable', () => {
      const configService = new MockConfigService(
        {
          NODE_ENV: 'production',
          TRUSTED_ORIGINS: '',
          BETTER_AUTH_URL: 'https://api.karasu256.com',
          BETTER_AUTH_SECRET: 'prod-secret',
        },
        'production',
      );

      const config = authConfigFactory(configService, productionYaml);
      const origins = config.getTrustedOrigins();

      expect(origins).toContain('https://api.karasu256.com');
      expect(origins).toContain('https://sso.karasu256.com');
    });

    it('should trim whitespace from environment variable origins', () => {
      const configService = new MockConfigService(
        {
          NODE_ENV: 'test',
          TRUSTED_ORIGINS: ' https://custom1.com , https://custom2.com ',
          BETTER_AUTH_URL: 'http://localhost:3001',
          BETTER_AUTH_SECRET: 'test-secret',
        },
        'test',
      );

      const config = authConfigFactory(configService, testYaml);
      const origins = config.getTrustedOrigins();

      expect(origins).toContain('https://custom1.com');
      expect(origins).toContain('https://custom2.com');
      expect(origins).not.toContain(' https://custom1.com ');
    });
  });

  describe('getCookieDomain', () => {
    it('should return environment variable COOKIE_DOMAIN when provided', () => {
      const configService = new MockConfigService(
        {
          NODE_ENV: 'production',
          COOKIE_DOMAIN: '.custom-domain.com',
          BETTER_AUTH_URL: 'https://api.karasu256.com',
          BETTER_AUTH_SECRET: 'prod-secret',
        },
        'production',
      );

      const config = authConfigFactory(configService, productionYaml);
      expect(config.getCookieDomain()).toBe('.custom-domain.com');
    });

    it('should return yaml cookie domain when environment variable is not provided', () => {
      const configService = new MockConfigService(
        {
          NODE_ENV: 'production',
          BETTER_AUTH_URL: 'https://api.karasu256.com',
          BETTER_AUTH_SECRET: 'prod-secret',
        },
        'production',
      );

      const config = authConfigFactory(configService, productionYaml);
      expect(config.getCookieDomain()).toBe('.karasu256.com');
    });
  });

  describe('getCrossSubDomainCookies', () => {
    it('should return enabled=true when COOKIE_DOMAIN is set', () => {
      const configService = new MockConfigService(
        {
          NODE_ENV: 'production',
          COOKIE_DOMAIN: '.test-domain.com',
          BETTER_AUTH_URL: 'https://api.karasu256.com',
          BETTER_AUTH_SECRET: 'prod-secret',
        },
        'production',
      );

      const config = authConfigFactory(configService, productionYaml);
      const crossSubDomainConfig = config.getCrossSubDomainCookies();

      expect(crossSubDomainConfig).toEqual({
        enabled: true,
        domain: '.test-domain.com',
      });
    });

    it('should return enabled=true when yaml cookieDomain is non-empty', () => {
      const configService = new MockConfigService(
        {
          NODE_ENV: 'production',
          BETTER_AUTH_URL: 'https://api.karasu256.com',
          BETTER_AUTH_SECRET: 'prod-secret',
        },
        'production',
      );

      const config = authConfigFactory(configService, productionYaml);
      const crossSubDomainConfig = config.getCrossSubDomainCookies();

      expect(crossSubDomainConfig.enabled).toBe(true);
      expect(crossSubDomainConfig.domain).toBe('.karasu256.com');
    });

    it('should return enabled=false when cookieDomain is empty', () => {
      const configService = new MockConfigService(
        {
          NODE_ENV: 'development',
          BETTER_AUTH_URL: 'http://localhost:3001',
          BETTER_AUTH_SECRET: 'dev-secret',
        },
        'development',
      );

      const config = authConfigFactory(configService, developmentYaml);
      const crossSubDomainConfig = config.getCrossSubDomainCookies();

      expect(crossSubDomainConfig.enabled).toBe(false);
    });
  });

  describe('getTrustedProxies', () => {
    it('should return yaml trusted proxies', () => {
      const configService = new MockConfigService(
        {
          NODE_ENV: 'development',
          BETTER_AUTH_URL: 'http://localhost:3001',
          BETTER_AUTH_SECRET: 'dev-secret',
        },
        'development',
      );

      const config = authConfigFactory(configService, developmentYaml);
      expect(config.getTrustedProxies()).toContain('127.0.0.1');
      expect(config.getTrustedProxies()).toContain('::1');
    });

    it('should return empty array for production yaml', () => {
      const configService = new MockConfigService(
        {
          NODE_ENV: 'production',
          BETTER_AUTH_URL: 'https://api.karasu256.com',
          BETTER_AUTH_SECRET: 'prod-secret',
        },
        'production',
      );

      const config = authConfigFactory(configService, productionYaml);
      expect(config.getTrustedProxies()).toEqual([]);
    });
  });
});
