import { createZodDto } from 'nestjs-zod';
import { blogDataSchema } from '@hashibutogarasu/common';

export const createBlogSchema = blogDataSchema.pick({
  title: true,
  content: true,
  tags: true,
  status: true,
}).partial({
  tags: true,
  status: true,
});

export class CreateBlogDto extends createZodDto(createBlogSchema) { }
