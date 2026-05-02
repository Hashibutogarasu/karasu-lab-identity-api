/**
 * Configuration for a social provider
 */
export type SocialProviderConfig = {
  /**
   * Provider identifier
   */
  id: string;
  /**
   * Provider display name
   */
  name: string;
  /**
   * OAuth client ID
   */
  clientId: string;
  /**
   * OAuth client secret
   */
  clientSecret: string;
  /**
   * Tenant ID (for Microsoft provider)
   */
  tenantId?: string;
  /**
   * OAuth scopes
   */
  scope?: string[];
  /**
   * Additional authorization query parameters
   */
  authorizationQuery?: Record<string, string>;
  /**
   * OAuth authorization endpoint (for custom providers)
   */
  authorizationEndpoint?: string;
  /**
   * OAuth token endpoint (for custom providers)
   */
  tokenEndpoint?: string;
  /**
   * OAuth user info endpoint (for custom providers)
   */
  userInfoEndpoint?: string;
};
