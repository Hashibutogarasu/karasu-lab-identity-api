import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const gameResponseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  image: z.string().url().optional().describe('Signed GET URL for the game image'),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * Data Transfer Object for game response.
 */
export class GameResponseDto extends createZodDto(gameResponseSchema) {}
