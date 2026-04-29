import { z } from 'zod';

export const authEnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  COOKIE_DOMAIN: z.string().optional(),
  TRUSTED_ORIGINS: z.string().optional(),
  TRUSTED_PROXIES: z.string().optional(),
  BETTER_AUTH_URL: z.string().url().default('http://localhost:3001'),
  BETTER_AUTH_SECRET: z.string().min(1).default('secret-for-testing'),
  FRONTEND_ORIGIN: z.string().url().optional(),
  DISCORD_CLIENT_ID: z.string().optional(),
  DISCORD_CLIENT_SECRET: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  MICROSOFT_CLIENT_ID: z.string().optional(),
  MICROSOFT_CLIENT_SECRET: z.string().optional(),
  MICROSOFT_TENANT_ID: z.string().optional(),
  X_CLIENT_ID: z.string().optional(),
  X_CLIENT_SECRET: z.string().optional(),
  PASSKEY_ORIGIN: z.string().url().optional(),
  DATABASE_URL: z.string().optional(),
  FIREBASE_PROJECT_ID: z.string().optional(),
  FIREBASE_CLIENT_EMAIL: z.string().optional(),
  FIREBASE_PRIVATE_KEY: z.string().optional(),
  ANDROID_SHA256_FINGERPRINTS: z.string().optional(),
});

export type AuthEnv = z.infer<typeof authEnvSchema>;

export const authConfig = authEnvSchema.parse(process.env);
