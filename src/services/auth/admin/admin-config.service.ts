import { Environment } from "@hashibutogarasu/common";
import { IAdminConfig } from "./admin-config.interface.js";
import { AbstractAdminConfig } from "./abstract-admin-config.js";
import { AbstractPluginEnvironment } from "../../../shared/plugin/abstract-plugin-environment.js";
import { readConfigContent } from "../../../utils/config.util.js";

/**
 * Production environment admin configuration
 * Reads admin user IDs from configs/config.json relative to project root
 */
class ProductionAdminConfig extends AbstractAdminConfig {
	constructor() {
		super();
		const content = readConfigContent("configs", "config.json");
		if (content) {
			this.parse(content);
		}
	}

	getUserIds(): string[] {
		return this.adminUserIds;
	}
}

/**
 * Development environment admin configuration
 */
class DevelopmentAdminConfig extends AbstractAdminConfig {
	getUserIds(): string[] {
		return this.adminUserIds;
	}
}

/**
 * Test environment admin configuration
 */
class TestAdminConfig extends AbstractAdminConfig {
	getUserIds(): string[] {
		return this.adminUserIds;
	}
}

/**
 * Factory function to create admin config based on environment
 * @returns Admin config instance for current environment
 */
export function adminConfigFactory(): IAdminConfig {
	return AbstractPluginEnvironment.resolve<
		IAdminConfig,
		AbstractAdminConfig,
		[]
	>(
		{
			[Environment.PRODUCTION]: ProductionAdminConfig as new () => AbstractAdminConfig,
			[Environment.DEVELOPMENT]: DevelopmentAdminConfig as new () => AbstractAdminConfig,
			[Environment.TEST]: TestAdminConfig as new () => AbstractAdminConfig,
		}
	);
}
