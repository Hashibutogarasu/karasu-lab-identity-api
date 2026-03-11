import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const updateStoneSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  amount: z.number().int().nonnegative().optional(),
});

/**
 * Data Transfer Object for updating a stone.
 */
export class UpdateStoneDto extends createZodDto(updateStoneSchema) {}
