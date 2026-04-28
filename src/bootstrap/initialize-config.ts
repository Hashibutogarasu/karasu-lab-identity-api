/* oxlint-disable @typescript-eslint/require-await */
import { IBetterAuthBootStrapper } from './better-auth-bootstrapper.interface.js';
import { AuthBootstrapContext } from './auth-bootstrap.context.js';
import { configServiceFactory } from '../shared/config/config.service.js';
import { authConfigFactory } from '../services/auth/config/auth-config.service.js';
import { socialProviderConfigFactory } from '../services/auth/socialProvider/social-provider-config.service.js';
import { adminConfigFactory } from '../services/auth/admin/admin-config.service.js';
import { rateLimitConfigFactory } from '../services/auth/rateLimit/rate-limit-config.service.js';
import { getApiConfig } from '../utils/config.util.js';

export class InitializeConfig implements IBetterAuthBootStrapper {
  constructor(private context: AuthBootstrapContext) {}

  async bootstrap(): Promise<void> {
    if (this.context.auth) return;

    this.context.configService = configServiceFactory();
    this.context.yamlConfig = getApiConfig();

    this.context.authConfigInstance = authConfigFactory(
      this.context.configService,
      this.context.yamlConfig.auth,
    );
    this.context.socialProviderConfigInstance = socialProviderConfigFactory(
      this.context.configService,
    );
    this.context.adminConfigInstance = adminConfigFactory();
    this.context.rateLimitConfigInstance = rateLimitConfigFactory(
      this.context.yamlConfig.rateLimit,
    );
  }
}
