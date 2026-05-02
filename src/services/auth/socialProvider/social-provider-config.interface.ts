import { SocialProviderConfig } from './types/social-provider.js';

/**
 * Social provider configuration interface
 * Defines OAuth provider credentials
 */
export interface ISocialProviderConfig {
  /**
   * Get all configured social providers
   * @returns Record of provider IDs to their credentials
   */
  getProviders(): Record<string, SocialProviderConfig>;

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
   * Provider display name
   */
  readonly name: string;

  /**
   * Check if this provider is enabled (has valid credentials)
   */
  isEnabled(): boolean;

  /**
   * Get provider credentials if enabled
   * @returns Provider credentials or null if not enabled
   */
  getCredentials(): {
    clientId: string;
    clientSecret: string;
    tenantId?: string;
  } | null;

  /**
   * Get provider scopes
   * @returns Provider scopes or undefined if using default
   */
  getScope?(): string[];

  /**
   * Get additional authorization query parameters
   * @returns Record of query parameters or undefined
   */
  getAuthorizationQuery?(): Record<string, string>;

  /**
   * Get provider OAuth2 endpoints (for custom providers)
   * @returns Provider endpoints or undefined if using default
   */
  getEndpoints?(): {
    authorizationEndpoint: string;
    tokenEndpoint: string;
    userInfoEndpoint: string;
  };
}
