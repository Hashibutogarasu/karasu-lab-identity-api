import { BetterAuthOptions } from 'better-auth';
import type { ApiYamlConfig } from '../../../utils/config.util.js';
import { IRateLimitConfig } from './rate-limit-config.interface.js';

export function rateLimitConfigFactory(
  yaml: ApiYamlConfig['rateLimit'],
): IRateLimitConfig {
  return {
    getConfig(): NonNullable<BetterAuthOptions['rateLimit']> {
      return yaml;
    },
  };
}
