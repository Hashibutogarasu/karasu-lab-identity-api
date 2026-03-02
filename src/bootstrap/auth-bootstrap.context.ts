import type { Auth as BetterAuthType } from "better-auth";
import { AuthEnvironment } from "../auth-environment.js";
import { ConfigService } from "../shared/config/config.service.js";
import { PostgresDatabaseService } from "../shared/database/postgres-database.service.js";
import { IAuthConfig } from "../services/auth/auth-config.interface.js";
import { ISocialProviderConfig } from "../services/auth/social-provider-config.interface.js";
import { IAuthNotificationService } from "../services/auth/auth-notification.service.interface.js";
import { IPasskeyAuth } from "../plugins/passkey/passkey.interface.js";
import { IAdminConfig } from "../services/auth/admin-config.interface.js";

export class AuthBootstrapContext {
  authEnv?: AuthEnvironment;
  configService?: ConfigService;
  dbService?: PostgresDatabaseService;
  authConfigInstance?: IAuthConfig;
  socialProviderConfigInstance?: ISocialProviderConfig;
  adminConfigInstance?: IAdminConfig;
  notificationService?: IAuthNotificationService;
  passkeyAuth?: IPasskeyAuth;
  auth?: BetterAuthType;
}
