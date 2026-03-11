import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createLogSchema = z.object({
  amount: z.number().int(),
});

/**
 * DTO for creating a new stone log.
 */
export class CreateLogDto extends createZodDto(createLogSchema) {}
