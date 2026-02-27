import { z } from 'zod';

import { statusSchema } from './status.schema.js';

export const updateBlogSchema = z.object({
  content: z.string().min(1).optional(),
  status: statusSchema.optional(),
  locked: z.boolean().optional(),
});

export type UpdateBlogDto = z.infer<typeof updateBlogSchema>;
