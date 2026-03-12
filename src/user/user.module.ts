import { Module } from '@nestjs/common';

import { SessionModule } from '../shared/auth/session.module.js';
import { DeletableModule } from '../shared/deletable/deletable.module.js';
import { BlogModule } from '../blogs/blog.module.js';
import { AttachmentModule } from '../attachments/attachment.module.js';
import { StoneManageModule } from '../apps/stonemanage/stone-manage.module.js';
import { RolesGuard } from '../shared/auth/roles.guard.js';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';

@Module({
  imports: [SessionModule, DeletableModule, BlogModule, AttachmentModule, StoneManageModule],
  controllers: [UserController],
  providers: [UserService, RolesGuard],
})
export class UserModule {}
