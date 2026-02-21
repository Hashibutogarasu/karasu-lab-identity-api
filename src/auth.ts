/* eslint-disable @typescript-eslint/require-await */
import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { createAuthMiddleware, deviceAuthorization, emailOTP, jwt, magicLink, oidcProvider, openAPI, organization, twoFactor } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { nextCookies } from "better-auth/next-js";
import dotenv from "dotenv";
import { sendEmail } from "./resend.js";
import { getFrontendUrl } from "./utils.js";
import { passwordPlugin } from "./plugins/password-plugin.js";
import { oauthApplicationPlugin } from "./plugins/oauth-application-plugin.js";

dotenv.config();

const safeArray = <T>(arr: Array<T | undefined | null>) =>
  arr.filter((v): v is T => v != null);

const advancedConfig =
  process.env.NODE_ENV === 'production'
    ? {
      crossSubDomainCookies: {
        enabled: true,
        domain: process.env.COOKIE_DOMAIN ?? '.karasu256.com',
      },
    }
    : undefined;

export const auth: ReturnType<typeof betterAuth> = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  advanced: advancedConfig,
  trustedOrigins: [
    ...safeArray([
      process.env.FRONTEND_ORIGIN,
      ...process.env.NODE_ENV !== "production" ? [
        "http://localhost:3000",
        "http://localhost:3001",
      ] : [],
      'https://karasu256.com',
      'https://www.karasu256.com',
      'https://id.karasu256.com',
      'https://sso.karasu256.com',
    ]),
  ],
  logger: {
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    disabled: false,
  },
  appName: "Karasu Lab",
  secret: process.env.BETTER_AUTH_SECRET,
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    twitter: {
      clientId: process.env.X_CLIENT_ID,
      clientSecret: process.env.X_CLIENT_SECRET,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
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
      loginPage: `${process.env.FRONTEND_ORIGIN}/login`,
      consentPage: `${process.env.FRONTEND_ORIGIN}/oauth/authorize`,
      scopes: ['openid', 'profile', 'email'],
      useJWTPlugin: true,
      allowDynamicClientRegistration: true,
    }),
    passkey({
      rpID: process.env.PASSKEY_RP_ID ?? "karasu256.com",
      rpName: process.env.PASSKEY_RP_NAME,
      origin: safeArray([
        process.env.PASSKEY_ORIGIN,
        "http://localhost:3000",
        "http://localhost:3001",
        "https://karasu256.com",
        "https://www.karasu256.com",
        "https://sso.karasu256.com",
      ]),
    }),
    twoFactor(),
    organization(),
    emailOTP({
      sendVerificationOTP: async ({ email, otp, type }) => {
        const frontendUrl = getFrontendUrl();
        const link = `${frontendUrl}/auth/email-verify?type=${encodeURIComponent(
          String(type ?? '')
        )}&email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`;

        await sendEmail({
          to: email,
          subject: "Your verification code",
          html: `Your verification code is: <strong>${otp}</strong><br/><br/>Click to verify: <a href="${link}">${link}</a>`,
        })
      },
      sendVerificationOnSignUp: false,
    }),
    magicLink({
      sendMagicLink: async ({ email, token }) => {
        const frontendUrl = getFrontendUrl();
        const link = `${frontendUrl}/auth/email-verify?type=${encodeURIComponent(
          'magic-link'
        )}&email=${encodeURIComponent(email)}&otp=${encodeURIComponent(token)}`;

        await sendEmail({
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
        await sendEmail({
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
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  rateLimit: {
    enabled: true,
    window: 60,
    max: 100,
  },
});