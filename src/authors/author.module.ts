import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller.js';
import { AuthorService } from './author.service.js';
import { FirebaseAdminServiceProvider } from '../shared/firebase/firebase-admin.provider.js';
import { ConfigServiceProvider } from '../shared/config/config.service.js';
import { SessionModule } from '../shared/auth/session.module.js';
import { RolesGuard } from '../shared/auth/roles.guard.js';

@Module({
  imports: [SessionModule],
  controllers: [AuthorController],
  providers: [AuthorService, FirebaseAdminServiceProvider, ConfigServiceProvider, RolesGuard],
  exports: [AuthorService],
})
export class AuthorModule {}
