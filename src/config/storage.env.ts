import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

export const storageEnvSchema = z.object({
  R2_ENDPOINT: z.string(),
  R2_ACCESS_KEY_ID: z.string().min(1),
  R2_SECRET_ACCESS_KEY: z.string().min(1),
  R2_BUCKET: z.string().min(1),
});

export type StorageEnv = z.infer<typeof storageEnvSchema>;

export const storageConfig = storageEnvSchema.parse(process.env);
