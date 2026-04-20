import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

import { statusSchema } from './status.schema.js';

export const listBlogsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sort: z.enum(['asc', 'desc']).default('desc'),
  status: statusSchema.optional(),
  cursor: z.string().optional(),
});

export class ListBlogsQueryDto extends createZodDto(listBlogsQuerySchema) {}
