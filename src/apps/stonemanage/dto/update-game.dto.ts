import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const updateGameSchema = z.object({
  title: z.string().min(1).max(255).optional(),
});

/**
 * Data Transfer Object for updating a game.
 */
export class UpdateGameDto extends createZodDto(updateGameSchema) {}
