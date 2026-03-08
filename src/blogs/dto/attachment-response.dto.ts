import { createZodDto } from 'nestjs-zod'
import { attachmentDataSchema } from '@hashibutogarasu/common';

export const attachmentResponseSchema = attachmentDataSchema;

export class AttachmentResponseDto extends createZodDto(attachmentResponseSchema) { }
