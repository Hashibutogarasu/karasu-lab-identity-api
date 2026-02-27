import { z } from 'zod';

/** Shared status enum used by both Blog and AttachmentMetadata. */
export const statusSchema = z.enum(['archived', 'draft', 'published']);

export type Status = z.infer<typeof statusSchema>;
