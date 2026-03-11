import { dotEnvService } from "../shared/config/dotenv.service.js";

dotEnvService.init();

import { z } from "zod";

export const storageEnvSchema = z.object({
  R2_ENDPOINT: z.string(),
  R2_ACCESS_KEY_ID: z.string().min(1),
  R2_SECRET_ACCESS_KEY: z.string().min(1),
  R2_BUCKET: z.string().min(1),
  R2_PUBLIC_URL: z.string().url().optional(),
});

export type StorageEnv = z.infer<typeof storageEnvSchema>;

export const storageConfig = storageEnvSchema.parse(process.env);
