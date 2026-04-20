import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const basePaginationQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  cursor: z.string().optional(),
});

export class BasePaginationQueryDto extends createZodDto(
  basePaginationQuerySchema,
) {}
