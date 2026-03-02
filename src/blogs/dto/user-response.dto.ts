import { z } from 'zod';
import { createZodDto } from 'nestjs-zod'

export const userResponseSchema = z.object({
	id: z.string(),
	name: z.string().nullable(),
	image: z.string().nullable(),
});

export class UserResponseDto extends createZodDto(userResponseSchema) { }
