import { Auth as BetterAuthType, BetterAuthOptions } from "better-auth";
import { admin, apiKey, bearer, createAuthMiddleware, deviceAuthorization, emailOTP, magicLink, oidcProvider, organization, twoFactor } from "better-auth/plugins";
import { firebaseAuthPlugin as firebaseAuth } from "better-auth-firebase-auth/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { BetterAuthBuilder, EnvironmentUtils } from "@hashibutogarasu/common";
import { passwordPlugin } from "./plugins/password/password-plugin.js";
import { oauthApplicationPlugin } from "./plugins/oauth/oauth-application-plugin.js";
import { passkeyPlugin } from "./plugins/passkey/passkey-plugin.js";
import { openAPIPlugin } from "./plugins/openapi/openapi-plugin.js";
import { discoveryPlugin } from "./plugins/discovery/discovery-plugin.js";
import { DatabaseSeedingService } from "./shared/database/database-seeding.service.js";
import { IPasskeyAuth } from "./plugins/passkey/passkey.interface.js";
import { IConfigService } from "./shared/config/config.service.interface.js";
import { IDataBaseService } from "./shared/database/database.service.interface.js";
import { IAuthConfig } from "./services/auth/auth-config.interface.js";
import { ISocialProviderConfig } from "./services/auth/social-provider-config.interface.js";
import { IAuthNotificationService } from "./services/auth/auth-notification.service.interface.js";
import { IBetterAuthBootStrapper } from "./bootstrap/better-auth-bootstrapper.interface.js";
import { I18nBootStrapper } from "./bootstrap/i18n.bootstrapper.js";
import { DatabaseSeedingBootStrapper } from "./bootstrap/database-seeding.bootstrapper.js";
import { AuthEnvironment } from "./auth-environment.js";
import { AuthBootstrapContext } from "./bootstrap/auth-bootstrap.context.js";
import { InitializeEnv } from "./bootstrap/initialize-env.js";
import { ValidEnv } from "./bootstrap/valid-env.js";
import { InitializeConfig } from "./bootstrap/initialize-config.js";
import { InitializeService } from "./bootstrap/initialize-service.js";
import { ErrorCodes } from "./shared/errors/error.codes.js";

export function createAuth(
  configService: IConfigService,
  dbService: IDataBaseService,
  notificationService: IAuthNotificationService,
  passkeyAuth: IPasskeyAuth,
  authConfig: IAuthConfig,
  socialProviderConfig: ISocialProviderConfig,
  overrides: Partial<BetterAuthOptions> = {}
): BetterAuthType {
  const env = configService.getAll();
  const authEnv = new AuthEnvironment(env.NODE_ENV);

  if (env.FIREBASE_PROJECT_ID && !getApps().length) {
    initializeApp({
      credential: cert({
        projectId: env.FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }

  const socialProviders = {
    ...socialProviderConfig.getProviders(),
    ...overrides.socialProviders,
  };

  const corePlugins = [
    openAPIPlugin(),
    discoveryPlugin(),
    oidcProvider({ loginPage: "/login" }),
    passwordPlugin(),
    oauthApplicationPlugin(),
    passkeyPlugin(passkeyAuth),
    twoFactor(),
    organization(),
    admin(),
    apiKey({ enableSessionForAPIKeys: true }),
    deviceAuthorization(),
    bearer(),
    emailOTP({
      sendVerificationOTP: async ({ email, otp, type }) => {
        await notificationService.sendVerificationOTP({ email, otp, type });
      },
      sendVerificationOnSignUp: false,
    }),
    magicLink({
      sendMagicLink: async ({ email, token }) => {
        await notificationService.sendMagicLink({ email, token });
      },
    }),
    ...(env.FIREBASE_PROJECT_ID ? [
      firebaseAuth({
        serverSideOnly: true,
        firebaseAdminAuth: getAuth(),
      })
    ] : []),
    ...(overrides.plugins ?? []),
  ];

  return BetterAuthBuilder.create()
    .basic.setBaseURL(env.BETTER_AUTH_URL)
    .basic.setBasePath('/api/auth')
    .basic.setSecret(env.BETTER_AUTH_SECRET)
    .basic.setAppName("Karasu Lab")
    .basic.setTrustedOrigins(authConfig.getTrustedOrigins())
    .basic.setAdvanced({ crossSubDomainCookies: authConfig.getCrossSubDomainCookies() })
    .basic.setLogger({
      level: EnvironmentUtils.isProduction(authEnv.environment) ? "info" : "debug",
      disabled: false,
    })
    .basic.setRateLimit(overrides.rateLimit ?? { enabled: true, window: 60, max: 100 })
    .email.setEmailAndPassword({ enabled: true, requireEmailVerification: true })
    .email.setEmailVerification({
      sendVerificationEmail: async ({ user, url }) => {
        await notificationService.sendVerificationEmail({ user, url });
      },
      sendOnSignUp: true,
      sendOnSignIn: true,
    })
    .auth.setSocialProviders(socialProviders)
    .auth.setHooks({
      after: createAuthMiddleware((context) => {
        if (context.path === "/oauth2/consent" || context.path === "/sign-out") {
          const expiredDate = new Date(0).toUTCString();
          const oidcCookies = ["oidc_login_prompt", "oidc_consent_prompt"];
          oidcCookies.forEach((cookieName) => {
            const setCookie = `${cookieName}=; Expires=${expiredDate}; Max-Age=0; Path=/; SameSite=lax`;
            context.setHeader("Set-Cookie", setCookie);
          });
        }
        return Promise.resolve();
      }),
    })
    .user.setUser({
      deleteUser: { enabled: true },
      changeEmail: {
        enabled: true,
        sendChangeEmailVerification: async ({ newEmail, url }) => {
          await notificationService.sendChangeEmailVerification({ newEmail, url });
        },
      },
    })
    .user.setAccount({
      accountLinking: { allowDifferentEmails: true },
      updateAccountOnSignIn: true,
    })
    .session.setSession({ cookieCache: { enabled: true, maxAge: 300 } })
    .database.setDatabase(dbService.getHandler())
    .withPlugins(corePlugins)
    .buildServer() as unknown as BetterAuthType;
}

let cachedAuth: BetterAuthType | null = null;

export async function initAuth(): Promise<BetterAuthType> {
  if (cachedAuth) {
    return cachedAuth;
  }

  const context = new AuthBootstrapContext();

  if (context.authEnv && EnvironmentUtils.isTest(context.authEnv.environment)) {
    cachedAuth = context.auth!;
    return cachedAuth;
  }

  const bootstrappers: IBetterAuthBootStrapper[] = [
    new InitializeEnv(context),
    new ValidEnv(context),
    new InitializeConfig(context),
    new InitializeService(context, createAuth),
    new I18nBootStrapper(),
  ];

  for (const bootstrapper of bootstrappers) {
    await bootstrapper.bootstrap();
  }

  if (
    context.authEnv &&
    EnvironmentUtils.isDevelopment(context.authEnv.environment) &&
    context.dbService
  ) {
    await new DatabaseSeedingBootStrapper(
      new DatabaseSeedingService(context.dbService.prisma)
    ).bootstrap();
  }

  if (!context.auth) {
    throw ErrorCodes.SYSTEM.AUTH_INITIALIZATION_FAILED;
  }

  cachedAuth = context.auth;
  return cachedAuth;
}

export const auth: BetterAuthType = await initAuth();
