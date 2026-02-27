import { z } from 'zod';

import { statusSchema } from './status.schema.js';

export const createAttachmentSchema = z.object({
  status: statusSchema.optional(),
});

export type CreateAttachmentDto = z.infer<typeof createAttachmentSchema>;
