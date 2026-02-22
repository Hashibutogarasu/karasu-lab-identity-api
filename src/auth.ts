/* eslint-disable @typescript-eslint/require-await */
import { betterAuth, BetterAuthOptions } from "better-auth";
import { createAuthMiddleware, deviceAuthorization, emailOTP, jwt, magicLink, oidcProvider, openAPI, organization, twoFactor } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { nextCookies } from "better-auth/next-js";
import { getFrontendUrl } from "./utils.js";
import { passwordPlugin } from "./plugins/password-plugin.js";
import { oauthApplicationPlugin } from "./plugins/oauth-application-plugin.js";
import { authConfig } from "./config/auth.env.js";
import { emailConfig } from "./config/email.env.js";
import { IConfigService } from "./shared/config/config.service.interface.js";
import { IMailService } from "./shared/mail/mail.service.interface.js";
import { IDataBaseService } from "./shared/database/database.service.interface.js";
import { ConfigService } from "./shared/config/config.service.js";
import { MailService } from "./shared/mail/mail.service.js";
import { PostgresDatabaseService } from "./shared/database/postgres-database.service.js";
import { Environment } from "./types/environment.js";
import { setupI18n } from "./shared/i18n/i18n.setup.js";
import { PasskeyAuth } from "./plugins/passkey/passkey.service.js";
import { IPasskeyAuth } from "./plugins/passkey/passkey.interface.js";
import { createAPIError, ErrorCodes } from "./shared/errors/error.codes.js";

export function createAuth(
  configService: IConfigService,
  dbService: IDataBaseService,
  mailService: IMailService,
  passkeyAuth: IPasskeyAuth,
  overrides: Partial<BetterAuthOptions> = {}
): ReturnType<typeof betterAuth> {
  const env = configService.getAll();
  const environment = env.NODE_ENV as Environment;

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
    advanced: {
      crossSubDomainCookies: {
        enabled: true,
        domain: env.COOKIE_DOMAIN ?? '.karasu256.com',
      },
    },
    trustedOrigins: [
      "http://localhost:3000",
      "https://sso.karasu256.com",
    ],
    logger: {
      level: environment === Environment.PRODUCTION ? "info" : "debug",
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
      after: createAuthMiddleware(async (context) => {
        if (context.path === "/oauth2/consent" || context.path === "/sign-out") {
          const expiredDate = new Date(0).toUTCString();
          const oidcCookies = ["oidc_login_prompt", "oidc_consent_prompt"];

          oidcCookies.forEach((cookieName) => {
            const setCookie = `${cookieName}=; Expires=${expiredDate}; Max-Age=0; Path=/; SameSite=lax`;
            context.setHeader("Set-Cookie", setCookie);
          });
        }
      }),
    },
    plugins: [
      passwordPlugin(),
      oauthApplicationPlugin(),
      deviceAuthorization({
        expiresIn: "30m",
        interval: "5s",
      }),
      nextCookies(),
      openAPI(),
      jwt(),
      oidcProvider({
        loginPage: `${env.FRONTEND_ORIGIN || getFrontendUrl()}/login`,
        consentPage: `${env.FRONTEND_ORIGIN || getFrontendUrl()}/oauth/authorize`,
        scopes: ['openid', 'profile', 'email'],
        useJWTPlugin: true,
        allowDynamicClientRegistration: true,
      }),
      passkey({
        rpID: passkeyAuth.getRPID(),
        rpName: passkeyAuth.getRPName(),
        origin: passkeyAuth.getOrigin(),
      }),
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
  };

  const finalOptions = {
    ...options,
    ...overrides,
    plugins: [...(options.plugins || []), ...(overrides.plugins || [])],
    socialProviders: { ...socialProviders, ...overrides.socialProviders }
  };

  return betterAuth(finalOptions);
}

const environment = authConfig.NODE_ENV as Environment;

export const auth: ReturnType<typeof betterAuth> = await (async () => {
  if (environment === Environment.TEST) {
    return {} as unknown as ReturnType<typeof betterAuth>;
  }

  await setupI18n();

  const prodConfigService = new ConfigService(environment);

  if (!emailConfig.RESEND_API_KEY) {
    throw createAPIError(ErrorCodes.SYSTEM.RESEND_API_KEY_REQUIRED);
  }

  const prodMailService = new MailService(
    environment,
    emailConfig.RESEND_API_KEY,
    `${emailConfig.EMAIL_FROM_NAME} <${emailConfig.EMAIL_FROM_ADDRESS}>`
  );
  const prodDbService = new PostgresDatabaseService(environment, authConfig.DATABASE_URL || "");
  const prodPasskeyAuth = new PasskeyAuth(prodConfigService);

  return createAuth(
    prodConfigService,
    prodDbService,
    prodMailService,
    prodPasskeyAuth
  );
})();
