import { Environment } from '@hashibutogarasu/common';
import { BetterAuthOptions } from 'better-auth';
import { loadApiConfig } from '../../../utils/config.util.js';
import { IRateLimitConfig } from './rate-limit-config.interface.js';
import { AbstractPluginEnvironment } from '../../../shared/plugin/abstract-plugin-environment.js';

/**
 * Abstract base class for rate limit configuration
 */
export abstract class AbstractRateLimitConfig
  extends AbstractPluginEnvironment<IRateLimitConfig>
  implements IRateLimitConfig
{
  abstract getConfig(): NonNullable<BetterAuthOptions['rateLimit']>;

  resolve(): IRateLimitConfig {
    return this;
  }
}

/**
 * Rate limit configuration loaded from configs/{env}.yml
 */
class YamlRateLimitConfig extends AbstractRateLimitConfig {
  getConfig(): NonNullable<BetterAuthOptions['rateLimit']> {
    return loadApiConfig(this.environment).rateLimit;
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
  >({
    [Environment.PRODUCTION]:
      YamlRateLimitConfig as new () => AbstractRateLimitConfig,
    [Environment.DEVELOPMENT]:
      YamlRateLimitConfig as new () => AbstractRateLimitConfig,
    [Environment.TEST]:
      YamlRateLimitConfig as new () => AbstractRateLimitConfig,
  });
}
