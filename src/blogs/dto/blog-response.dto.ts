import { z } from 'zod';
import { createZodDto } from 'nestjs-zod'
import { blogDataSchema } from '@hashibutogarasu/common';

export const blogResponseSchema = blogDataSchema;

export class BlogResponseDto extends createZodDto(blogResponseSchema) { }

export const paginatedBlogResponseSchema = z.object({
	data: z.array(blogResponseSchema),
	total: z.number(),
	page: z.number(),
	limit: z.number(),
	totalPages: z.number(),
});

export class PaginatedBlogResponseDto extends createZodDto(paginatedBlogResponseSchema) { }
