import { z } from 'zod';
import { createZodDto } from 'nestjs-zod'
import { attachmentResponseSchema } from './attachment-response.dto.js';
import { statusSchema } from './status.schema.js';

export const blogResponseSchema = z.object({
	id: z.string(),
	content: z.string(),
	authorId: z.string(),
	status: statusSchema,
	locked: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string(),
	attachments: z.array(attachmentResponseSchema).optional(),
});

export class BlogResponseDto extends createZodDto(blogResponseSchema) { }

export const paginatedBlogResponseSchema = z.object({
	data: z.array(blogResponseSchema),
	total: z.number(),
	page: z.number(),
	limit: z.number(),
	totalPages: z.number(),
});

export class PaginatedBlogResponseDto extends createZodDto(paginatedBlogResponseSchema) { }
