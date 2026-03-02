import type { Auth as BetterAuthType } from "better-auth";
import { AuthEnvironment } from "../auth-environment.js";
import { IConfigService } from "../shared/config/config.service.interface.js";
import { PostgresDatabaseService } from "../shared/database/postgres-database.service.js";
import { IAuthConfig } from "../services/auth/config/auth-config.interface.js";
import { ISocialProviderConfig } from "../services/auth/socialProvider/social-provider-config.interface.js";
import { IAuthNotificationService } from "../services/auth/notification/auth-notification.service.interface.js";
import { IPasskeyAuth } from "../plugins/passkey/passkey.interface.js";
import { IAdminConfig } from "../services/auth/admin/admin-config.interface.js";
import { IRateLimitConfig } from "../services/auth/rateLimit/rate-limit-config.interface.js";

export class AuthBootstrapContext {
  authEnv?: AuthEnvironment;
  configService?: IConfigService;
  dbService?: PostgresDatabaseService;
  authConfigInstance?: IAuthConfig;
  socialProviderConfigInstance?: ISocialProviderConfig;
  adminConfigInstance?: IAdminConfig;
  rateLimitConfigInstance?: IRateLimitConfig;
  notificationService?: IAuthNotificationService;
  passkeyAuth?: IPasskeyAuth;
  auth?: BetterAuthType;
}
