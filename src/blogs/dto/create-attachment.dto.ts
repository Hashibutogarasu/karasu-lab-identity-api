import { z } from 'zod';
import { createZodDto } from 'nestjs-zod'

import { statusSchema } from './status.schema.js';

export const createAttachmentSchema = z.object({
  status: statusSchema.optional(),
});

export class CreateAttachmentDto extends createZodDto(createAttachmentSchema) { }
