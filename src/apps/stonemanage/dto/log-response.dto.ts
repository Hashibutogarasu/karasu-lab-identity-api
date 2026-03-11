import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const logResponseSchema = z.object({
  id: z.string(),
  stoneId: z.string(),
  userId: z.string(),
  amount: z.number().int(),
  previousAmount: z.number().int().optional(),
  nextAmount: z.number().int().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * DTO for log responses.
 */
export class LogResponseDto extends createZodDto(logResponseSchema) {}
