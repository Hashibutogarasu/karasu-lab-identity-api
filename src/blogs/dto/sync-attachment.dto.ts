import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

import { statusSchema } from './status.schema.js';

/**
 * Request body for syncing an already-uploaded attachment from R2 storage
 * into Firestore.  The caller must supply the blog ID that owns the attachment
 * so the server can reconstruct the storage key and verify the object exists.
 */
export const syncAttachmentSchema = z.object({
  blogId: z.string().min(1),
  status: statusSchema.optional(),
});

export class SyncAttachmentDto extends createZodDto(syncAttachmentSchema) {}
