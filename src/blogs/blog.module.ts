import { Module } from '@nestjs/common';

import { BlogController } from './blog.controller.js';
import { BlogService } from './blog.service.js';
import { FirebaseAdminProvider } from '../shared/firebase/firebase-admin.provider.js';
import { ConfigService } from '../shared/config/config.service.js';

@Module({
	controllers: [BlogController],
	providers: [BlogService, FirebaseAdminProvider, ConfigService],
})
export class BlogModule {}
