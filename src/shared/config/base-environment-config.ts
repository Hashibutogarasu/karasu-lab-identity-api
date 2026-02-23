import { IEnvironmentConfig } from "./environment-config.interface.js";
import { Environment } from "../../types/environment.js";

export abstract class BaseEnvironmentConfig implements IEnvironmentConfig {
  readonly environment: Environment;

  constructor(environment: Environment | string) {
    this.environment = this.parseEnvironment(environment);
  }

  private parseEnvironment(env: Environment | string): Environment {
    if (Object.values(Environment).includes(env as Environment)) {
      return env as Environment;
    }
    return Environment.DEVELOPMENT;
  }

  isProduction(): boolean {
    return this.environment === Environment.PRODUCTION;
  }

  isDevelopment(): boolean {
    return this.environment === Environment.DEVELOPMENT;
  }

  isTest(): boolean {
    return this.environment === Environment.TEST;
  }
}
