import { z } from 'zod';
import { createZodDto } from 'nestjs-zod'

import { statusSchema } from './status.schema.js';

export const createBlogSchema = z.object({
  content: z.string(),
  status: statusSchema.optional(),
  locked: z.boolean().optional(),
});

export class CreateBlogDto extends createZodDto(createBlogSchema) { }
