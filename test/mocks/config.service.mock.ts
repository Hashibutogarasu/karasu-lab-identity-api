import { Environment } from "../../src/types/environment.js";
import { AuthEnv } from "../../src/config/auth.env.js";
import { AbstractConfigService } from "../../src/shared/config/abstract-config.service.js";

export class MockConfigService extends AbstractConfigService {
  constructor(overrides: Partial<AuthEnv> = {}, environment: Environment = Environment.TEST) {
    const defaultConfig: AuthEnv = {
      NODE_ENV: "test",
      BETTER_AUTH_URL: "http://localhost:3000/api/auth",
      BETTER_AUTH_SECRET: "mock-secret",
      // ... default other fields if necessary or rely on Partial
    } as AuthEnv;
    
    super(environment, { ...defaultConfig, ...overrides } as AuthEnv);
  }
}
