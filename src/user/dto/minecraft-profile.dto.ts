import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const minecraftProfileSchema = z.object({
  id: z.string().describe('Minecraft UUID'),
  name: z.string().describe('Minecraft IGN'),
  skinUrl: z.string().optional().describe('Minecraft skin URL'),
});

export class MinecraftProfileDto extends createZodDto(minecraftProfileSchema) {}
