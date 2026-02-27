import { z } from 'zod';

import { statusSchema } from './status.schema.js';

export const createBlogSchema = z.object({
  content: z.string().min(1),
  status: statusSchema.optional(),
  locked: z.boolean().optional(),
});

export type CreateBlogDto = z.infer<typeof createBlogSchema>;
