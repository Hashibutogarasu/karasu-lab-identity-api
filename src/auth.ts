import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { emailOTP, magicLink, oidcProvider, openAPI, organization, twoFactor } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { nextCookies } from "better-auth/next-js";
import dotenv from "dotenv";
import { sendEmail } from "./resend.js";
import { getFrontendUrl } from "./utils.js";

dotenv.config();

export const auth: ReturnType<typeof betterAuth> = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain: "karasu256.com",
    },
  },
  trustedOrigins: [
    process.env.FRONTEND_ORIGIN,
    ...process.env.NODE_ENV !== "production" ? [
      "http://localhost:3000",
      "http://localhost:3001",
    ] : [],
    'https://karasu256.com',
    'https://id.karasu256.com',
    'https://sso.karasu256.com',
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
  disabledPaths: [
    "/oauth/token",
  ],
  plugins: [
    nextCookies(),
    openAPI(),
    oidcProvider({
      loginPage: "/login",
      consentPage: "/oauth/authorize",
    }),
    passkey({
      rpID: process.env.PASSKEY_RP_ID,
      rpName: process.env.PASSKEY_RP_NAME,
      origin: [
        process.env.PASSKEY_ORIGIN,
        "http://localhost:3000",
        "http://localhost:3001",
        "https://karasu256.com",
      ],
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