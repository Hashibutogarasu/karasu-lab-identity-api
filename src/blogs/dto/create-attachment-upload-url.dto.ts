import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

/**
 * Request body for issuing a presigned upload URL for an attachment.
 * The caller must supply the content type of the file to be uploaded
 * so that the presigned URL can enforce it.
 */
export const createAttachmentUploadUrlSchema = z.object({
  contentType: z.string().min(1),
});

export class CreateAttachmentUploadUrlDto extends createZodDto(
  createAttachmentUploadUrlSchema,
) {}
