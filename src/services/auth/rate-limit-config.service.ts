import { Environment } from "@hashibutogarasu/common";
import { BetterAuthOptions } from "better-auth";
import { IRateLimitConfig } from "./rate-limit-config.interface.js";
import { AbstractPluginEnvironment } from "../../shared/plugin/abstract-plugin-environment.js";

/**
 * Abstract base class for rate limit configuration
 */
export abstract class AbstractRateLimitConfig extends AbstractPluginEnvironment<IRateLimitConfig> implements IRateLimitConfig {
	abstract getConfig(): NonNullable<BetterAuthOptions["rateLimit"]>;

	resolve(): IRateLimitConfig {
		return this;
	}
}

/**
 * Production environment rate limit configuration
 */
class ProductionRateLimitConfig extends AbstractRateLimitConfig {
	getConfig(): NonNullable<BetterAuthOptions["rateLimit"]> {
		return {
			enabled: true,
			window: 60,
			max: 100,
		};
	}
}

/**
 * Development environment rate limit configuration
 */
class DevelopmentRateLimitConfig extends AbstractRateLimitConfig {
	getConfig(): NonNullable<BetterAuthOptions["rateLimit"]> {
		return {
			enabled: true,
			window: 60,
			max: 1000,
		};
	}
}

/**
 * Test environment rate limit configuration
 */
class TestRateLimitConfig extends AbstractRateLimitConfig {
	getConfig(): NonNullable<BetterAuthOptions["rateLimit"]> {
		return {
			enabled: false,
		};
	}
}

/**
 * Factory function to create rate limit config based on environment
 * @returns Rate limit config instance for current environment
 */
export function rateLimitConfigFactory(): IRateLimitConfig {
	return AbstractPluginEnvironment.resolve<
		IRateLimitConfig,
		AbstractRateLimitConfig,
		[]
	>(
		{
			[Environment.PRODUCTION]: ProductionRateLimitConfig as new () => AbstractRateLimitConfig,
			[Environment.DEVELOPMENT]: DevelopmentRateLimitConfig as new () => AbstractRateLimitConfig,
			[Environment.TEST]: TestRateLimitConfig as new () => AbstractRateLimitConfig,
		}
	);
}
