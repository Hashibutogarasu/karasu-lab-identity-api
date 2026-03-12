import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const updateUserProfileSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  image: z.string().url().optional(),
  username: z.string().min(1).max(64).optional(),
  displayUsername: z.boolean().optional(),
});

export class UpdateUserProfileDto extends createZodDto(updateUserProfileSchema) {}
