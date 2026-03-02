/* eslint-disable @typescript-eslint/require-await */
import { IBetterAuthBootStrapper } from "./better-auth-bootstrapper.interface.js";
import { AuthBootstrapContext } from "./auth-bootstrap.context.js";
import { authConfig } from "../config/auth.env.js";
import { emailConfig } from "../config/email.env.js";
import { mailService } from "../shared/mail/mail.service.js";
import { PostgresDatabaseService } from "../shared/database/postgres-database.service.js";
import { authNotificationServiceFactory } from "../services/auth/auth-notification.service.js";
import { passkeyAuthFactory } from "../plugins/passkey/passkey.service.js";
import type { createAuth } from "../auth.js";

export class InitializeService implements IBetterAuthBootStrapper {
  constructor(
    private context: AuthBootstrapContext,
    private authFactory: typeof createAuth
  ) {}

  async bootstrap(): Promise<void> {
    if (this.context.auth) return;

    const configService = this.context.configService;
    
    const mailServiceInstance = mailService(
      emailConfig.RESEND_API_KEY,
      {
        name: emailConfig.EMAIL_FROM_NAME,
        address: emailConfig.EMAIL_FROM_ADDRESS,
      }
    );
    this.context.dbService = new PostgresDatabaseService(authConfig.NODE_ENV, authConfig.DATABASE_URL);
    this.context.notificationService = authNotificationServiceFactory(mailServiceInstance, configService);
    this.context.passkeyAuth = passkeyAuthFactory(configService);

    this.context.auth = this.authFactory(
      configService,
      this.context.dbService,
      this.context.notificationService,
      this.context.passkeyAuth,
      this.context.authConfigInstance,
      this.context.socialProviderConfigInstance,
      this.context.adminConfigInstance
    );
  }
}
