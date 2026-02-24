import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

export const authEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  COOKIE_DOMAIN: z.string().optional(),
  BETTER_AUTH_URL: z.string().url().default("http://localhost:3001"),
  BETTER_AUTH_SECRET: z.string().min(1).default("secret-for-testing"),
  FRONTEND_ORIGIN: z.string().url().optional(),
  DISCORD_CLIENT_ID: z.string().optional(),
  DISCORD_CLIENT_SECRET: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  X_CLIENT_ID: z.string().optional(),
  X_CLIENT_SECRET: z.string().optional(),
  TWITTER_CLIENT_ID: z.string().optional(),
  TWITTER_CLIENT_SECRET: z.string().optional(),
  PASSKEY_RP_ID: z.string().default("localhost"),
  PASSKEY_RP_NAME: z.string().default("Karasu Lab"),
  PASSKEY_ORIGIN: z.string().url().optional(),
  DATABASE_URL: z.string().optional(),
});

export type AuthEnv = z.infer<typeof authEnvSchema>;

export const authConfig = authEnvSchema.parse(process.env);
