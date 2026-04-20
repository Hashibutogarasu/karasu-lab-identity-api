import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createImageUploadUrlSchema = z.object({
  contentType: z
    .enum(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
    .describe('The MIME type of the image to be uploaded.'),
});

/**
 * Data Transfer Object for requesting a presigned image upload URL.
 */
export class CreateImageUploadUrlDto extends createZodDto(
  createImageUploadUrlSchema,
) {}
