import { Module } from '@nestjs/common';

import { BlogController } from './blog.controller.js';
import { BlogService } from './blog.service.js';
import { FirebaseAdminServiceProvider } from '../shared/firebase/firebase-admin.provider.js';
import { ConfigServiceProvider } from '../shared/config/config.service.js';
import { SessionModule } from '../shared/auth/session.module.js';
import { RolesGuard } from '../shared/auth/roles.guard.js';

@Module({
	imports: [SessionModule],
	controllers: [BlogController],
	providers: [BlogService, FirebaseAdminServiceProvider, ConfigServiceProvider, RolesGuard],
	exports: [BlogService],
})
export class BlogModule {}
