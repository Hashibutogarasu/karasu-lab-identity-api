import { z } from 'zod';
import { createZodDto } from 'nestjs-zod'

import { statusSchema } from './status.schema.js';

export const updateBlogSchema = z.object({
  content: z.string().min(1).optional(),
  status: statusSchema.optional(),
  locked: z.boolean().optional(),
});

export class UpdateBlogDto extends createZodDto(updateBlogSchema) { }
