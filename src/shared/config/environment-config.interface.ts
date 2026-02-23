import { Environment } from "../../types/environment.js";

export interface IEnvironmentConfig {
  readonly environment: Environment;
  isProduction(): boolean;
  isDevelopment(): boolean;
  isTest(): boolean;
}
