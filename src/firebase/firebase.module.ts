import { Module } from '@nestjs/common';
import { FirebaseController } from './firebase.controller.js';
import { FirebaseService } from './firebase.service.js';
import { AuthMiddlewareModule } from '../shared/auth/auth-middleware.module.js';
import { SessionModule } from '../shared/auth/session.module.js';

@Module({
  imports: [
    AuthMiddlewareModule.forRoot({ path: '/api/auth' }),
    SessionModule,
  ],
  controllers: [FirebaseController],
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
