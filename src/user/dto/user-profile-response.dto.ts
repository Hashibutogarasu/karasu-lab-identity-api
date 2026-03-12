import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const userProfileResponseSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().email(),
  image: z.string().nullable(),
  username: z.string().nullable(),
  displayUsername: z.boolean().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export class UserProfileResponseDto extends createZodDto(userProfileResponseSchema) {}
