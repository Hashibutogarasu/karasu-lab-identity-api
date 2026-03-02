/**
 * Admin configuration service interface
 * Provides admin user configuration for better-auth
 */
export interface IAdminConfig {
	/**
	 * Get list of admin user IDs
	 * @returns Array of user ID strings
	 */
	getUserIds(): string[];

	/**
	 * Parse input string and update admin configuration
	 * @param val JSON string to parse
	 * @returns Boolean indicating if parsing was successful
	 */
	parse(val: string): boolean;
}
