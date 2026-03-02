import { Environment } from "@hashibutogarasu/common";
import { authEnvSchema } from "../../config/auth.env.js";
import { AbstractConfigService } from "./abstract-config.service.js";
import { IConfigService } from "./config.service.interface.js";
import dotenv from "dotenv";

/**
 * Production environment config service
 */
class ProductionConfigService extends AbstractConfigService {
	constructor() {
		dotenv.config();
		const parsedConfig = authEnvSchema.parse(process.env);
		super(Environment.PRODUCTION, parsedConfig);
	}
}

/**
 * Development environment config service
 */
class DevelopmentConfigService extends AbstractConfigService {
	constructor() {
		dotenv.config();
		const parsedConfig = authEnvSchema.parse(process.env);
		super(Environment.DEVELOPMENT, parsedConfig);
	}
}

/**
 * Test environment config service
 */
class TestConfigService extends AbstractConfigService {
	constructor() {
		const parsedConfig = authEnvSchema.parse(process.env);
		super(Environment.TEST, parsedConfig);
	}
}

/**
 * Factory function to create config service based on environment
 * @returns Config service instance for current environment
 */
export function configServiceFactory(): IConfigService {
	const currentEnv = (process.env.NODE_ENV as Environment) || Environment.DEVELOPMENT;
	const classes = {
		[Environment.PRODUCTION]: ProductionConfigService,
		[Environment.DEVELOPMENT]: DevelopmentConfigService,
		[Environment.TEST]: TestConfigService,
	};
	const EnvClass = classes[currentEnv] || classes[Environment.DEVELOPMENT];
	return new EnvClass();
}

/**
 * NestJS Provider for IConfigService
 */
export const ConfigServiceProvider = {
	provide: IConfigService,
	useFactory: configServiceFactory,
};
