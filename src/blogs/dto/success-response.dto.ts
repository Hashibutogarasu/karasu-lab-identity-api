import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const successResponseSchema = z.object({});

export class SuccessResponseDto extends createZodDto(successResponseSchema) {}
