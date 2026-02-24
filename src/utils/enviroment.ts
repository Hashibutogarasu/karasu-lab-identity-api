 
import { Environment } from "../types/environment.js";

export class EnvironmentUtils {
	static isProduction(env: Environment | string): boolean {
		return (env as Environment) === Environment.PRODUCTION;
	}

	static isDevelopment(env: Environment | string): boolean {
		return (env as Environment) === Environment.DEVELOPMENT;
	}

	static isTest(env: Environment | string): boolean {
		return (env as Environment) === Environment.TEST;
	}
}
