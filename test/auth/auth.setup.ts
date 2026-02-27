import { beforeAll, afterAll } from 'vitest';
import { createAuth } from '../../src/auth.js';
import { genericOAuth } from "better-auth/plugins";
import { MockConfigService } from '../mocks/config.service.mock.js';
import { MockAuthNotificationService } from '../mocks/auth-notification.service.mock.js';
import { MemoryDatabaseService } from '../mocks/memory-database.service.js';
import { passkeyAuthFactory } from '../../src/plugins/passkey/passkey.service.js';
import { authConfigFactory } from '../../src/services/auth/auth-config.service.js';
import { socialProviderConfigFactory } from '../../src/services/auth/social-provider-config.service.js';

export let testDbService: MemoryDatabaseService;
export let testNotificationService: MockAuthNotificationService;
export let testAuth: ReturnType<typeof createAuth>;

beforeAll(() => {
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

  testAuth = createAuth(configService, testDbService, testNotificationService, passkeyAuth, authConfig, socialProviderConfig, {
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
});

afterAll(async () => {
  if (testDbService) {
    await testDbService.close();
  }
});
