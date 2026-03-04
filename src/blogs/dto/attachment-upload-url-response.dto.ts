import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

/**
 * Response body returned when a presigned upload URL is successfully issued.
 * The client should use `uploadUrl` to PUT the file directly to R2 storage,
 * then call the sync endpoint with `attachmentId` to register the file in Firestore.
 */
export const attachmentUploadUrlResponseSchema = z.object({
  uploadUrl: z.string().url(),
  attachmentId: z.string(),
  key: z.string(),
  expiresIn: z.number().int().positive(),
});

export class AttachmentUploadUrlResponseDto extends createZodDto(
  attachmentUploadUrlResponseSchema,
) {}
