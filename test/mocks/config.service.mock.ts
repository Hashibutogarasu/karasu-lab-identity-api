import { AuthEnv } from "../../src/config/auth.env.js";
import { AbstractConfigService } from "../../src/shared/config/abstract-config.service.js";

export class MockConfigService extends AbstractConfigService {
  constructor(overrides: Partial<AuthEnv> = {}, environment: string = "test") {
    const defaultConfig: AuthEnv = {
      NODE_ENV: "test",
      BETTER_AUTH_URL: "http://localhost:3000/api/auth",
      BETTER_AUTH_SECRET: "mock-secret",
      PASSKEY_RP_ID: "localhost",
      PASSKEY_RP_NAME: "Test App",
    } as AuthEnv;
    
    super(environment, { ...defaultConfig, ...overrides } as AuthEnv);
  }
}
