import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

/**
 * Schema for an individual authentication provider
 */
export const ProviderSchema = z.object({
  id: z.string().describe('The unique identifier for the provider (e.g., "google", "discord")'),
  name: z.string().describe('The display name for the provider'),
});

/**
 * Schema for the providers list response
 */
export const ProvidersResponseSchema = z.object({
  providers: z.array(ProviderSchema).describe('List of available authentication providers'),
});

/**
 * DTO for the providers list response
 */
export class ProvidersResponseDto extends createZodDto(ProvidersResponseSchema) {}
