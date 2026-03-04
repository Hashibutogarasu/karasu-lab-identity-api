/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from 'zod';
import { BlogStatus } from '@hashibutogarasu/common';

/** Shared status enum used by both Blog and AttachmentMetadata. */
export const statusSchema = z.enum([
	BlogStatus.ARCHIVED,
	BlogStatus.DRAFT,
	BlogStatus.LOCKED,
	BlogStatus.PUBLISHED,
]);

export type Status = z.infer<typeof statusSchema>;
