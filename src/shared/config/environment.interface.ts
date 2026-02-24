import { Environment } from "../../types/environment.js";

export interface IEnvironment {
  readonly environment: Environment;
  isProduction(): boolean;
  isDevelopment(): boolean;
  isTest(): boolean;
}
