import { z } from 'zod';

export const emailEnvSchema = z.object({
  RESEND_API_KEY: z.string().optional().default('dummy'),
  EMAIL_FROM_NAME: z.string().min(1).default('Karasu Lab'),
  EMAIL_FROM_ADDRESS: z.string().email().default('no-reply@karasu256.com'),
});

export type EmailEnv = z.infer<typeof emailEnvSchema>;

export const emailConfig = emailEnvSchema.parse(process.env);
