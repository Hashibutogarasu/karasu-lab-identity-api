import dotenv from "dotenv";
import { IDotEnvService } from "./dotenv.service.interface.js";
import { AbstractPluginEnvironment } from "../plugin/abstract-plugin-environment.js";
import { Environment } from "@hashibutogarasu/common";

/**
 * Abstract base class for DotEnv services
 */
export abstract class AbstractDotEnvService extends AbstractPluginEnvironment<IDotEnvService> implements IDotEnvService {
	abstract init(): void;

	resolve(): IDotEnvService {
		return this;
	}
}

/**
 * Production environment DotEnv service
 */
class ProductionDotEnvService extends AbstractDotEnvService {
	init(): void {
		dotenv.config();
	}
}

/**
 * Development environment DotEnv service
 */
class DevelopmentDotEnvService extends AbstractDotEnvService {
	init(): void {
		dotenv.config();
	}
}

/**
 * Test environment DotEnv service
 * Loads environment variables for tests
 */
class TestDotEnvService extends AbstractDotEnvService {
	init(): void {
		dotenv.config();
	}
}

/**
 * Factory function to create DotEnv service based on environment
 * @returns DotEnv service instance for current environment
 */
export function dotEnvServiceFactory(): IDotEnvService {
	return AbstractPluginEnvironment.resolve<
		IDotEnvService,
		AbstractDotEnvService,
		[]
	>(
		{
			[Environment.PRODUCTION]: ProductionDotEnvService as new () => AbstractDotEnvService,
			[Environment.DEVELOPMENT]: DevelopmentDotEnvService as new () => AbstractDotEnvService,
			[Environment.TEST]: TestDotEnvService as new () => AbstractDotEnvService,
		}
	);
}

/**
 * Singleton instance for early initialization in main.ts and tests
 */
export const dotEnvService = dotEnvServiceFactory();

/**
 * NestJS Provider for IDotEnvService
 */
export const DotEnvServiceProvider = {
	provide: IDotEnvService,
	useFactory: dotEnvServiceFactory,
};
