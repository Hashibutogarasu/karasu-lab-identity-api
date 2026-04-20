import { createZodDto } from 'nestjs-zod';
import { blogDataSchema } from '@hashibutogarasu/common';

export const updateBlogSchema = blogDataSchema
  .pick({
    title: true,
    content: true,
    tags: true,
    status: true,
  })
  .partial();

export class UpdateBlogDto extends createZodDto(updateBlogSchema) {}
