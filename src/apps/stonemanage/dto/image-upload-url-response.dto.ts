import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const imageUploadUrlResponseSchema = z.object({
  uploadUrl: z
    .string()
    .url()
    .describe('The presigned URL to PUT the image to.'),
  imageKey: z
    .string()
    .describe('The key referencing the image object in storage.'),
  expiresIn: z
    .number()
    .describe('Number of seconds until the upload URL expires.'),
});

/**
 * Data Transfer Object for responding with a presigned image upload URL.
 */
export class ImageUploadUrlResponseDto extends createZodDto(
  imageUploadUrlResponseSchema,
) {}
