import { vi, beforeAll, afterAll } from 'vitest';
import Database from 'better-sqlite3';
import { AuthEnv } from '../../src/config/auth.env.js';
import { createAuth } from '../../src/auth.js';
import { genericOAuth } from "better-auth/plugins";

vi.mock('../../src/resend.js', () => ({
  sendEmail: vi.fn().mockResolvedValue({ id: 'test_email_id' })
}));

export let testDb: ReturnType<typeof Database>;
export let testAuth: ReturnType<typeof createAuth>;

beforeAll(async () => {
  testDb = new Database(':memory:');
  
  const testEnv: AuthEnv = {
    NODE_ENV: 'test',
    BETTER_AUTH_URL: 'http://localhost:3000/api/auth',
    BETTER_AUTH_SECRET: 'super-secret-test-key',
    FRONTEND_ORIGIN: 'http://localhost:3000',
  };
  testAuth = createAuth(testEnv, {
    database: testDb,
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

  const ctx = await testAuth.$context;
  await ctx.runMigrations();

});

afterAll(() => {
  if (testDb) {
    testDb.close();
  }
});
