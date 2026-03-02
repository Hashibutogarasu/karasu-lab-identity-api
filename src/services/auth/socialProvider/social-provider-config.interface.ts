/**
 * Social provider configuration interface
 * Defines OAuth provider credentials
 */
export interface ISocialProviderConfig {
  /**
   * Get all configured social providers
   * @returns Record of provider IDs to their credentials
   */
  getProviders(): Record<string, { clientId: string; clientSecret: string }>;

  /**
   * Check if a specific provider is configured
   * @param providerId Provider identifier (e.g., 'discord', 'google', 'x')
   * @returns True if provider has valid credentials configured
   */
  isProviderEnabled(providerId: string): boolean;
}

/**
 * Individual social provider interface
 * Each provider implements this to provide its credentials
 */
export interface ISocialProvider {
  /**
   * Provider identifier (e.g., 'discord', 'google', 'x')
   */
  readonly id: string;

  /**
   * Check if this provider is enabled (has valid credentials)
   */
  isEnabled(): boolean;

  /**
   * Get provider credentials if enabled
   * @returns Provider credentials or null if not enabled
   */
  getCredentials(): { clientId: string; clientSecret: string } | null;
}
