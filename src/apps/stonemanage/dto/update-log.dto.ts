import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const updateLogSchema = z.object({
  amount: z.number().int().optional(),
});

/**
 * DTO for updating an existing stone log.
 */
export class UpdateLogDto extends createZodDto(updateLogSchema) {}
