import { z } from 'zod';

import { statusSchema } from './status.schema.js';
import { createZodDto } from 'nestjs-zod'

export const updateAttachmentSchema = z.object({
  status: statusSchema.optional(),
});

export class UpdateAttachmentDto extends createZodDto(updateAttachmentSchema) { }
