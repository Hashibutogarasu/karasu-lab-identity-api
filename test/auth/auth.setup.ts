import { beforeAll, afterAll } from 'vitest';
import { createAuth } from '../../src/auth.js';
import { genericOAuth } from "better-auth/plugins";
import { MockConfigService } from '../mocks/config.service.mock.js';
import { MockMailService } from '../mocks/mail.service.mock.js';
import { MemoryDatabaseService } from '../mocks/memory-database.service.js';
import { PasskeyAuth } from '../../src/plugins/passkey/passkey.service.js';

export let testDbService: MemoryDatabaseService;
export let testMailService: MockMailService;
export let testAuth: ReturnType<typeof createAuth>;

beforeAll(async () => {
  const configService = new MockConfigService({
    BETTER_AUTH_URL: 'http://localhost:3000/api/auth',
    BETTER_AUTH_SECRET: 'super-secret-test-key',
    FRONTEND_ORIGIN: 'http://localhost:3000',
  }, "test");

  testMailService = new MockMailService("test");
  testDbService = new MemoryDatabaseService("test");
  const passkeyAuth = new PasskeyAuth(configService);
  
  testAuth = createAuth(configService, testDbService, testMailService, passkeyAuth, {
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
