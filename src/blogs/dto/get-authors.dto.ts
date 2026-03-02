import { z } from 'zod';
import { createZodDto } from 'nestjs-zod'

export const getAuthorsSchema = z.object({
	ids: z.array(z.string()).min(1).max(100),
});

export class GetAuthorsDto extends createZodDto(getAuthorsSchema) { }
