import { z } from 'zod';

import { statusSchema } from './status.schema.js';

export const updateAttachmentSchema = z.object({
  status: statusSchema.optional(),
});

export type UpdateAttachmentDto = z.infer<typeof updateAttachmentSchema>;
