/**
 * Auth configuration service interface
 * Provides environment-specific configuration for better-auth
 */
export interface IAuthConfig {
  /**
   * Get list of trusted origins for CORS
   * @returns Array of allowed origin URLs
   */
  getTrustedOrigins(): string[];

  /**
   * Get cookie domain for cross-subdomain cookies
   * @returns Domain string (e.g., '.karasu256.com')
   */
  getCookieDomain(): string;

  /**
   * Get cross-subdomain cookie configuration
   * @returns Configuration object with enabled flag and domain
   */
  getCrossSubDomainCookies(): {
    enabled: boolean;
    domain: string;
  };

  /**
   * Get list of allowed headers for CORS
   * @returns Comma-separated string of allowed headers
   */
  getAllowedHeaders(): string;

  /**
   * Get whether to allow credentials for CORS
   * @returns Boolean indicating if credentials are allowed
   */
  getCredentials(): boolean;
}
