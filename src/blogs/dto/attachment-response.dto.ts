import { z } from 'zod';
import { createZodDto } from 'nestjs-zod'
import { statusSchema } from './status.schema.js';

export const attachmentResponseSchema = z.object({
	id: z.string(),
	blogId: z.string(),
	key: z.string(),
	contentType: z.string(),
	size: z.number(),
	status: statusSchema,
	authorId: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export class AttachmentResponseDto extends createZodDto(attachmentResponseSchema) { }
