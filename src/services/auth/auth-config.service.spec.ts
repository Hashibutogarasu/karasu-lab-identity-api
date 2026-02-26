import { describe, it, expect, afterEach } from 'vitest';
import { MockConfigService } from '../../../test/mocks/config.service.mock.js';
import { authConfigFactory } from './auth-config.service.js';

describe('AuthConfigService', () => {
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  describe('authConfigFactory', () => {
    it('should return ProductionAuthConfig for production environment', () => {
      process.env.NODE_ENV = 'production';

      const configService = new MockConfigService({
        NODE_ENV: 'production',
        BETTER_AUTH_URL: 'https://api.karasu256.com',
        BETTER_AUTH_SECRET: 'prod-secret',
      }, 'production');

      const config = authConfigFactory(configService);
      const origins = config.getTrustedOrigins();

      expect(origins).toEqual([
        'https://sso.karasu256.com',
        'https://www.karasu256.com',
        'https://karasu256.com',
        'https://id.karasu256.com',
      ]);
      expect(config.getCookieDomain()).toBe('.karasu256.com');
    });

    it('should return DevelopmentAuthConfig for development environment', () => {
      process.env.NODE_ENV = 'development';

      const configService = new MockConfigService({
        NODE_ENV: 'development',
        BETTER_AUTH_URL: 'http://localhost:3001',
        BETTER_AUTH_SECRET: 'dev-secret',
      }, 'development');

      const config = authConfigFactory(configService);
      const origins = config.getTrustedOrigins();

      expect(origins).toContain('http://localhost:3000');
      expect(origins).toContain('https://karasu256.com');
      expect(config.getCookieDomain()).toBe('localhost');
    });

    it('should return TestAuthConfig for test environment', () => {
      process.env.NODE_ENV = 'test';

      const configService = new MockConfigService({
        NODE_ENV: 'test',
        BETTER_AUTH_URL: 'http://localhost:3001',
        BETTER_AUTH_SECRET: 'test-secret',
      }, 'test');

      const config = authConfigFactory(configService);
      const origins = config.getTrustedOrigins();

      expect(origins).toEqual(['http://localhost:3000']);
      expect(config.getCookieDomain()).toBe('localhost');
    });

    it('should default to DevelopmentAuthConfig when NODE_ENV is undefined', () => {
      delete process.env.NODE_ENV;

      const configService = new MockConfigService({
        BETTER_AUTH_URL: 'http://localhost:3001',
        BETTER_AUTH_SECRET: 'dev-secret',
      }, 'development');

      const config = authConfigFactory(configService);
      const origins = config.getTrustedOrigins();

      expect(origins).toContain('http://localhost:3000');
    });
  });

  describe('getTrustedOrigins', () => {
    it('should merge environment variable origins with defaults', () => {
      process.env.NODE_ENV = 'development';

      const configService = new MockConfigService({
        NODE_ENV: 'development',
        TRUSTED_ORIGINS: 'https://custom1.com,https://custom2.com',
        BETTER_AUTH_URL: 'http://localhost:3001',
        BETTER_AUTH_SECRET: 'dev-secret',
      }, 'development');

      const config = authConfigFactory(configService);
      const origins = config.getTrustedOrigins();

      expect(origins).toContain('http://localhost:3000');
      expect(origins).toContain('https://custom1.com');
      expect(origins).toContain('https://custom2.com');
    });

    it('should remove duplicate origins', () => {
      process.env.NODE_ENV = 'development';

      const configService = new MockConfigService({
        NODE_ENV: 'development',
        TRUSTED_ORIGINS: 'http://localhost:3000,https://karasu256.com',
        BETTER_AUTH_URL: 'http://localhost:3001',
        BETTER_AUTH_SECRET: 'dev-secret',
      }, 'development');

      const config = authConfigFactory(configService);
      const origins = config.getTrustedOrigins();

      const uniqueOrigins = Array.from(new Set(origins));
      expect(origins.length).toBe(uniqueOrigins.length);
      expect(origins.filter((o) => o === 'http://localhost:3000')).toHaveLength(1);
      expect(origins.filter((o) => o === 'https://karasu256.com')).toHaveLength(1);
    });

    it('should handle empty TRUSTED_ORIGINS environment variable', () => {
      process.env.NODE_ENV = 'production';

      const configService = new MockConfigService({
        NODE_ENV: 'production',
        TRUSTED_ORIGINS: '',
        BETTER_AUTH_URL: 'https://api.karasu256.com',
        BETTER_AUTH_SECRET: 'prod-secret',
      }, 'production');

      const config = authConfigFactory(configService);
      const origins = config.getTrustedOrigins();

      expect(origins).toEqual([
        'https://sso.karasu256.com',
        'https://www.karasu256.com',
        'https://karasu256.com',
        'https://id.karasu256.com',
      ]);
    });

    it('should trim whitespace from environment variable origins', () => {
      process.env.NODE_ENV = 'test';

      const configService = new MockConfigService({
        NODE_ENV: 'test',
        TRUSTED_ORIGINS: ' https://custom1.com , https://custom2.com ',
        BETTER_AUTH_URL: 'http://localhost:3001',
        BETTER_AUTH_SECRET: 'test-secret',
      }, 'test');

      const config = authConfigFactory(configService);
      const origins = config.getTrustedOrigins();

      expect(origins).toContain('https://custom1.com');
      expect(origins).toContain('https://custom2.com');
      expect(origins).not.toContain(' https://custom1.com ');
    });
  });

  describe('getCookieDomain', () => {
    it('should return environment variable COOKIE_DOMAIN when provided', () => {
      process.env.NODE_ENV = 'production';

      const configService = new MockConfigService({
        NODE_ENV: 'production',
        COOKIE_DOMAIN: '.custom-domain.com',
        BETTER_AUTH_URL: 'https://api.karasu256.com',
        BETTER_AUTH_SECRET: 'prod-secret',
      }, 'production');

      const config = authConfigFactory(configService);
      expect(config.getCookieDomain()).toBe('.custom-domain.com');
    });

    it('should return default cookie domain when environment variable is not provided', () => {
      process.env.NODE_ENV = 'production';

      const configService = new MockConfigService({
        NODE_ENV: 'production',
        BETTER_AUTH_URL: 'https://api.karasu256.com',
        BETTER_AUTH_SECRET: 'prod-secret',
      }, 'production');

      const config = authConfigFactory(configService);
      expect(config.getCookieDomain()).toBe('.karasu256.com');
    });
  });

  describe('getCrossSubDomainCookies', () => {
    it('should return enabled configuration with correct domain', () => {
      process.env.NODE_ENV = 'production';

      const configService = new MockConfigService({
        NODE_ENV: 'production',
        COOKIE_DOMAIN: '.test-domain.com',
        BETTER_AUTH_URL: 'https://api.karasu256.com',
        BETTER_AUTH_SECRET: 'prod-secret',
      }, 'production');

      const config = authConfigFactory(configService);
      const crossSubDomainConfig = config.getCrossSubDomainCookies();

      expect(crossSubDomainConfig).toEqual({
        enabled: true,
        domain: '.test-domain.com',
      });
    });

    it('should always return enabled: true', () => {
      process.env.NODE_ENV = 'development';

      const configService = new MockConfigService({
        NODE_ENV: 'development',
        BETTER_AUTH_URL: 'http://localhost:3001',
        BETTER_AUTH_SECRET: 'dev-secret',
      }, 'development');

      const config = authConfigFactory(configService);
      const crossSubDomainConfig = config.getCrossSubDomainCookies();

      expect(crossSubDomainConfig.enabled).toBe(true);
    });
  });

  describe('Environment-specific defaults', () => {
    it('should have correct production defaults', () => {
      process.env.NODE_ENV = 'production';

      const configService = new MockConfigService({
        NODE_ENV: 'production',
        BETTER_AUTH_URL: 'https://api.karasu256.com',
        BETTER_AUTH_SECRET: 'prod-secret',
      }, 'production');

      const config = authConfigFactory(configService);

      expect(config.getCookieDomain()).toBe('.karasu256.com');
      expect(config.getTrustedOrigins()).not.toContain('http://localhost:3000');
    });

    it('should have correct development defaults', () => {
      process.env.NODE_ENV = 'development';

      const configService = new MockConfigService({
        NODE_ENV: 'development',
        BETTER_AUTH_URL: 'http://localhost:3001',
        BETTER_AUTH_SECRET: 'dev-secret',
      }, 'development');

      const config = authConfigFactory(configService);

      expect(config.getCookieDomain()).toBe('localhost');
      expect(config.getTrustedOrigins()).toContain('http://localhost:3000');
    });

    it('should have correct test defaults', () => {
      process.env.NODE_ENV = 'test';

      const configService = new MockConfigService({
        NODE_ENV: 'test',
        BETTER_AUTH_URL: 'http://localhost:3001',
        BETTER_AUTH_SECRET: 'test-secret',
      }, 'test');

      const config = authConfigFactory(configService);

      expect(config.getCookieDomain()).toBe('localhost');
      expect(config.getTrustedOrigins()).toEqual(['http://localhost:3000']);
    });
  });
});
