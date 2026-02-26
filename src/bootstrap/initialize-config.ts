/* eslint-disable @typescript-eslint/require-await */
import { IBetterAuthBootStrapper } from "./better-auth-bootstrapper.interface.js";
import { AuthBootstrapContext } from "./auth-bootstrap.context.js";
import { authConfig } from "../config/auth.env.js";
import { ConfigService } from "../shared/config/config.service.js";
import { authConfigFactory } from "../services/auth/auth-config.service.js";
import { socialProviderConfigFactory } from "../services/auth/social-provider-config.service.js";

export class InitializeConfig implements IBetterAuthBootStrapper {
  constructor(private context: AuthBootstrapContext) {}

  async bootstrap(): Promise<void> {
    if (this.context.auth) return;

    this.context.configService = new ConfigService(authConfig.NODE_ENV);
    this.context.authConfigInstance = authConfigFactory(this.context.configService);
    this.context.socialProviderConfigInstance = socialProviderConfigFactory(this.context.configService);
  }
}
