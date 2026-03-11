import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const stoneResponseSchema = z.object({
  id: z.string(),
  gameId: z.string(),
  userId: z.string(),
  name: z.string(),
  amount: z.number(),
  image: z.string().url().optional().describe('Signed GET URL for the stone image'),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * Data Transfer Object for stone response.
 */
export class StoneResponseDto extends createZodDto(stoneResponseSchema) {}
