 
 
import { Auth as BetterAuthType, BetterAuthOptions } from "better-auth";
import { createAuthMiddleware, emailOTP, magicLink, oidcProvider, organization, twoFactor } from "better-auth/plugins";
import { BetterAuthBuilder, EnvironmentUtils, AbstractEnvironment } from "@hashibutogarasu/common";
import { getFrontendUrl } from "./utils.js";
import { passwordPlugin } from "./plugins/password/password-plugin.js";
import { oauthApplicationPlugin } from "./plugins/oauth/oauth-application-plugin.js";
import { passkeyPlugin } from "./plugins/passkey/passkey-plugin.js";
import { openAPIPlugin } from "./plugins/openapi/openapi-plugin.js";
import { discoveryPlugin } from "./plugins/discovery/discovery-plugin.js";
import { DatabaseSeedingService } from "./shared/database/database-seeding.service.js";
import { authConfig } from "./config/auth.env.js";
import { emailConfig } from "./config/email.env.js";
import { IPasskeyAuth } from "./plugins/passkey/passkey.interface.js";
import { passkeyAuthFactory } from "./plugins/passkey/passkey.service.js";
import { IConfigService } from "./shared/config/config.service.interface.js";
import { ConfigService } from "./shared/config/config.service.js";
import { IDataBaseService } from "./shared/database/database.service.interface.js";
import { PostgresDatabaseService } from "./shared/database/postgres-database.service.js";
import { createAPIError, ErrorCodes } from "./shared/errors/error.codes.js";
import { setupI18n } from "./shared/i18n/i18n.setup.js";
import { IMailService } from "./shared/mail/mail.service.interface.js";
import { mailService } from "./shared/mail/mail.service.js";
import { IAuthConfig } from "./services/auth/auth-config.interface.js";
import { authConfigFactory } from "./services/auth/auth-config.service.js";
import { ISocialProviderConfig } from "./services/auth/social-provider-config.interface.js";
import { socialProviderConfigFactory } from "./services/auth/social-provider-config.service.js";

class AuthEnvironment extends AbstractEnvironment {}

export function createAuth(
  configService: IConfigService,
  dbService: IDataBaseService,
  mailService: IMailService,
  passkeyAuth: IPasskeyAuth,
  authConfig: IAuthConfig,
  socialProviderConfig: ISocialProviderConfig,
  overrides: Partial<BetterAuthOptions> = {}
): Auth {
  const env = configService.getAll();
  const authEnv = new AuthEnvironment(env.NODE_ENV);

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
    emailOTP({
      sendVerificationOTP: async ({ email, otp, type }) => {
        const frontendUrl = env.FRONTEND_ORIGIN || getFrontendUrl();
        const link = `${frontendUrl}/auth/email-verify?type=${encodeURIComponent(
          String(type ?? '')
        )}&email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`;
        await mailService.sendEmail({
          to: email,
          subject: "Your verification code",
          html: `Your verification code is: <strong>${otp}</strong><br/><br/>Click to verify: <a href="${link}">${link}</a>`,
        });
      },
      sendVerificationOnSignUp: false,
    }),
    magicLink({
      sendMagicLink: async ({ email, token }) => {
        const frontendUrl = env.FRONTEND_ORIGIN || getFrontendUrl();
        const link = `${frontendUrl}/auth/email-verify?type=${encodeURIComponent(
          'magic-link'
        )}&email=${encodeURIComponent(email)}&otp=${encodeURIComponent(token)}`;
        await mailService.sendEmail({
          to: email,
          subject: "Your magic link",
          html: `Click the link to sign in: <a href="${link}">${link}</a>`,
        });
      },
    }),
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
    .basic.setRateLimit({ enabled: true, window: 60, max: 100 })
    .email.setEmailAndPassword({ enabled: true, requireEmailVerification: true })
    .email.setEmailVerification({
      sendVerificationEmail: async ({ user, url }) => {
        await mailService.sendEmail({
          to: user.email,
          subject: "Verify your email address",
          html: `Click the link to verify your email: <a href="${url}">${url}</a>`,
        });
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
          await mailService.sendEmail({
            to: newEmail,
            subject: "Confirm your new email address",
            html: `Click the link to confirm your new email address: <a href="${url}">${url}</a>`,
          });
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
    .buildServer() as unknown as Auth;
}

export type Auth = BetterAuthType;
let cachedAuth: Auth | null = null;

export async function initAuth(): Promise<Auth> {
  if (cachedAuth) {
    return cachedAuth;
  }

  const authEnv = new AuthEnvironment(authConfig.NODE_ENV);
  if (EnvironmentUtils.isTest(authEnv.environment)) {
    return {} as unknown as Auth;
  }

  await setupI18n();

  const configService = new ConfigService(authConfig.NODE_ENV);

  if (EnvironmentUtils.isProduction(authEnv.environment) && !emailConfig.RESEND_API_KEY) {
    throw createAPIError(ErrorCodes.SYSTEM.RESEND_API_KEY_REQUIRED);
  }

  const mailServiceInstance = mailService(
    emailConfig.RESEND_API_KEY,
    {
      name: emailConfig.EMAIL_FROM_NAME,
      address: emailConfig.EMAIL_FROM_ADDRESS,
    }
  );
  const dbService = new PostgresDatabaseService(authConfig.NODE_ENV, authConfig.DATABASE_URL);

  if (EnvironmentUtils.isDevelopment(authEnv.environment)) {
    const seedingService = new DatabaseSeedingService(dbService.prisma);
    await seedingService.seed();
  }

  const passkeyAuth = passkeyAuthFactory(configService);
  const authConfigInstance = authConfigFactory(configService);
  const socialProviderConfigInstance = socialProviderConfigFactory(configService);

  cachedAuth = createAuth(
    configService,
    dbService,
    mailServiceInstance,
    passkeyAuth,
    authConfigInstance,
    socialProviderConfigInstance
  );

  return cachedAuth;
}

export const auth: Auth = await initAuth();
