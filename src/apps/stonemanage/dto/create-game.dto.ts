import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createGameSchema = z.object({
  title: z.string().min(1).max(255),
});

/**
 * Data Transfer Object for creating a new game.
 */
export class CreateGameDto extends createZodDto(createGameSchema) {}
