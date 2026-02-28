import { Module } from '@nestjs/common';

import { AttachmentController } from './attachment.controller.js';
import { BlogModule } from '../blogs/blog.module.js';
import { SessionModule } from '../shared/auth/session.module.js';

@Module({
  imports: [BlogModule, SessionModule],
  controllers: [AttachmentController],
})
export class AttachmentModule {}
