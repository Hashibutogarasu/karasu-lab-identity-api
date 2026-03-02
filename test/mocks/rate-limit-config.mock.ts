import { BetterAuthOptions } from "better-auth";
import { IRateLimitConfig } from "../../src/services/auth/rate-limit-config.interface.js";

/**
 * Mock implementation of IRateLimitConfig for testing
 */
export class MockRateLimitConfig implements IRateLimitConfig {
	constructor(private readonly config: NonNullable<BetterAuthOptions["rateLimit"]> = { enabled: false }) {}

	getConfig(): NonNullable<BetterAuthOptions["rateLimit"]> {
		return this.config;
	}
}
