import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createStoneSchema = z.object({
  name: z.string().min(1).max(255),
  amount: z.number().int().nonnegative(),
});

/**
 * Data Transfer Object for creating a new stone.
 */
export class CreateStoneDto extends createZodDto(createStoneSchema) {}
