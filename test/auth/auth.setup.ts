import { beforeAll, afterAll } from 'vitest';
import { createAuth } from '../../src/auth.js';
import { genericOAuth } from "better-auth/plugins";
import { MockConfigService } from '../mocks/config.service.mock.js';
import { MockAuthNotificationService } from '../mocks/auth-notification.service.mock.js';
import { MemoryDatabaseService } from '../mocks/memory-database.service.js';
import { passkeyAuthFactory } from '../../src/plugins/passkey/passkey.service.js';
import { authConfigFactory } from '../../src/services/auth/config/auth-config.service.js';
import { socialProviderConfigFactory } from '../../src/services/auth/socialProvider/social-provider-config.service.js';

import { DatabaseSeedingConstants } from '../../src/shared/database/seeding.service.interface.js';
import { MockAdminConfig } from '../mocks/admin-config.mock.js';
import { MockRateLimitConfig } from '../mocks/rate-limit-config.mock.js';
import { MockDatabaseSeedingService } from '../mocks/database-seeding.service.mock.js';

export let testDbService: MemoryDatabaseService;
export let testNotificationService: MockAuthNotificationService;
export let testAuth: ReturnType<typeof createAuth>;

beforeAll(async () => {
  const configService = new MockConfigService({
    BETTER_AUTH_URL: 'http://localhost:3000/api/auth',
    BETTER_AUTH_SECRET: 'super-secret-test-key',
    FRONTEND_ORIGIN: 'http://localhost:3000',
  }, "test");

  testNotificationService = new MockAuthNotificationService();
  testDbService = new MemoryDatabaseService("test");
  const passkeyAuth = passkeyAuthFactory(configService);
  const authConfig = authConfigFactory(configService);
  const socialProviderConfig = socialProviderConfigFactory(configService);
  const adminConfig = new MockAdminConfig([DatabaseSeedingConstants.DUMMY_USER_ID]);
  const rateLimitConfig = new MockRateLimitConfig({ enabled: false });

  testAuth = createAuth(configService, testDbService, testNotificationService, passkeyAuth, authConfig, socialProviderConfig, adminConfig, rateLimitConfig, {
    rateLimit: { enabled: false },

    plugins: [
      genericOAuth({
        config: [
          {
            providerId: "dummy",
            authorizationUrl: "https://dummy.com/auth",
            tokenUrl: "https://dummy.com/token",
            userInfoUrl: "https://dummy.com/userinfo",
            clientId: "dummy_client",
            clientSecret: "dummy_secret",
          }
        ]
      })
    ]
  });

  const mockSeeding = new MockDatabaseSeedingService(testAuth);
  await mockSeeding.seed();
});

afterAll(async () => {
  if (testDbService) {
    await testDbService.close();
  }
});
