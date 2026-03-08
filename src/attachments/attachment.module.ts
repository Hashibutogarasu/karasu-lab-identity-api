import { Module } from '@nestjs/common';

import { AttachmentController } from './attachment.controller.js';
import { AttachmentService } from './attachment.service.js';
import { SessionModule } from '../shared/auth/session.module.js';
import { FirebaseAdminServiceProvider } from '../shared/firebase/firebase-admin.provider.js';
import { ConfigServiceProvider } from '../shared/config/config.service.js';

@Module({
  imports: [SessionModule],
  controllers: [AttachmentController],
  providers: [AttachmentService, FirebaseAdminServiceProvider, ConfigServiceProvider],
  exports: [AttachmentService],
})
export class AttachmentModule {}
