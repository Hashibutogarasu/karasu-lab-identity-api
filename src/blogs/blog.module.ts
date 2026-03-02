import { Module } from '@nestjs/common';

import { BlogController } from './blog.controller.js';
import { BlogService } from './blog.service.js';
import { FirebaseAdminProvider } from '../shared/firebase/firebase-admin.provider.js';
import { ConfigService } from '../shared/config/config.service.js';
import { SessionModule } from '../shared/auth/session.module.js';

@Module({
	imports: [SessionModule],
	controllers: [BlogController],
	providers: [BlogService, FirebaseAdminProvider, ConfigService],
	exports: [BlogService],
})
export class BlogModule {}
