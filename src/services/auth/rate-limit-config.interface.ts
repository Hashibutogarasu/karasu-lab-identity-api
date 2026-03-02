import { BetterAuthOptions } from "better-auth";

/**
 * Rate limit configuration service interface
 */
export interface IRateLimitConfig {
	/**
	 * Get rate limit configuration for better-auth
	 * @returns Rate limit options
	 */
	getConfig(): NonNullable<BetterAuthOptions["rateLimit"]>;
}
