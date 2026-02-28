import { z } from 'zod';

import { statusSchema } from './status.schema.js';

export const createBlogSchema = z.object({
  content: z.string(),
  status: statusSchema.optional(),
  locked: z.boolean().optional(),
});

export type CreateBlogDto = z.infer<typeof createBlogSchema>;
