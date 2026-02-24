import { betterAuth, BetterAuthOptions } from "better-auth/minimal";
import { createAuthMiddleware, emailOTP, magicLink, organization, twoFactor } from "better-auth/plugins";
import { getFrontendUrl } from "./utils.js";
import { passwordPlugin } from "./plugins/password/password-plugin.js";
import { oauthApplicationPlugin } from "./plugins/oauth/oauth-application-plugin.js";
import { passkeyPlugin } from "./plugins/passkey/passkey-plugin.js";
import { openAPIPlugin } from "./plugins/openapi/openapi-plugin.js";
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
import { MailService } from "./shared/mail/mail.service.js";
import { AbstractEnvironment } from "./shared/config/abstract-environment.js";

class AuthEnvironment extends AbstractEnvironment {}

export function createAuth(
  configService: IConfigService,
  dbService: IDataBaseService,
  mailService: IMailService,
  passkeyAuth: IPasskeyAuth,
  overrides: Partial<BetterAuthOptions> = {}
): ReturnType<typeof betterAuth> {
  const env = configService.getAll();
  const authEnv = new AuthEnvironment(env.NODE_ENV);

  const socialProviders: Record<string, { clientId: string; clientSecret: string }> = {};

  if (env.DISCORD_CLIENT_ID && env.DISCORD_CLIENT_SECRET) {
    socialProviders.discord = {
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    };
  }
  if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
    socialProviders.google = {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    };
  }
  if (env.X_CLIENT_ID && env.X_CLIENT_SECRET) {
    socialProviders.twitter = {
      clientId: env.X_CLIENT_ID,
      clientSecret: env.X_CLIENT_SECRET,
    };
  }

  const options: BetterAuthOptions = {
    baseURL: env.BETTER_AUTH_URL,
    basePath: '/api/auth',
    advanced: {
      crossSubDomainCookies: {
        enabled: true,
        domain: env.COOKIE_DOMAIN ?? '.karasu256.com',
      },
    },
    trustedOrigins: [
      "http://localhost:3000",
      "https://sso.karasu256.com",
      "https://www.karasu256.com",
      "https://karasu256.com",
      "https://www.karasu256.com",
    ],
    logger: {
      level: authEnv.isProduction() ? "info" : "debug",
      disabled: false,
    },
    appName: "Karasu Lab",
    secret: env.BETTER_AUTH_SECRET,
    socialProviders,
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
    },
    emailVerification: {
      sendVerificationEmail: async ({ user, url }) => {
        await mailService.sendEmail({
          to: user.email,
          subject: "Verify your email address",
          html: `Click the link to verify your email: <a href="${url}">${url}</a>`,
        });
      },
      sendOnSignUp: true,
      sendOnSignIn: true,
    },
    hooks: {
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
    },
    plugins: [
      openAPIPlugin(),
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
          })
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
      })
    ],
    user: {
      deleteUser: {
        enabled: true,
      },
      changeEmail: {
        enabled: true,
        sendChangeEmailVerification: async ({ newEmail, url }) => {
          await mailService.sendEmail({
            to: newEmail,
            subject: "Confirm your new email address",
            html: `Click the link to confirm your new email address: <a href="${url}">${url}</a>`,
          });
        }
      }
    },
    account: {
      accountLinking: {
        allowDifferentEmails: true
      },
      updateAccountOnSignIn: true,
    },
    database: dbService.getHandler(),
    rateLimit: {
      enabled: true,
      window: 60,
      max: 100,
    },
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 300
      }
    }
  };

  const finalOptions = {
    ...options,
    ...overrides,
    plugins: [...(options.plugins || []), ...(overrides.plugins || [])],
    socialProviders: { ...socialProviders, ...overrides.socialProviders }
  };

  return betterAuth(finalOptions);
}

export type Auth = ReturnType<typeof betterAuth>;

export async function initAuth() {
  const authEnv = new AuthEnvironment(authConfig.NODE_ENV);
  if (authEnv.isTest()) {
    return {} as unknown as ReturnType<typeof betterAuth>;
  }

  await setupI18n();

  const configService = new ConfigService(authConfig.NODE_ENV);

  if (!emailConfig.RESEND_API_KEY) {
    throw createAPIError(ErrorCodes.SYSTEM.RESEND_API_KEY_REQUIRED);
  }

  const mailService = new MailService(
    authConfig.NODE_ENV,
    emailConfig.RESEND_API_KEY,
    `${emailConfig.EMAIL_FROM_NAME} <${emailConfig.EMAIL_FROM_ADDRESS}>`
  );
  const dbService = new PostgresDatabaseService(authConfig.NODE_ENV, authConfig.DATABASE_URL);
  const passkeyAuth = passkeyAuthFactory(configService);

  return createAuth(
    configService,
    dbService,
    mailService,
    passkeyAuth
  );
}
