import { IEnvironment } from "./environment.interface.js";
import { Environment } from "../../types/environment.js";
import { config as getEnvConfig } from "dotenv";

export abstract class AbstractEnvironment implements IEnvironment {
  readonly environment: Environment;

  constructor(environment?: Environment | string) {
    getEnvConfig();
    this.environment = this.parseEnvironment(environment ?? process.env.NODE_ENV);
  }

  private parseEnvironment(env?: Environment | string): Environment {
    if (env && Object.values(Environment).includes(env as Environment)) {
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
