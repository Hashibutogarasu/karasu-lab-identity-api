import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { II18nService } from './shared/i18n/i18n.service.interface.js';
import { I18nService } from './shared/i18n/i18n.service.js';
import { StorageModule } from './storage/storage.module.js';
import { storageConfig } from './config/storage.env.js';
import { BlogModule } from './blogs/blog.module.js';
import { AuthorModule } from './authors/author.module.js';
import { AttachmentModule } from './attachments/attachment.module.js';
import { OpenApiModule } from './shared/openapi/openapi.module.js';
import { AuthMiddlewareModule } from './shared/auth/auth-middleware.module.js';
import { StoneManageModule } from './apps/stonemanage/stone-manage.module.js';
import { UserModule } from './user/user.module.js';
import { initAuth } from './auth.js';
import { FirebaseModule } from './firebase/firebase.module.js';
import { ProvidersModule } from './providers/providers.module.js';
import { ConfigServiceProvider } from './shared/config/config.service.js';
import { DotEnvServiceProvider } from './shared/config/dotenv.service.js';
import { VersionModule } from './version/version.module.js';
import { RolesGuard } from './shared/auth/roles.guard.js';
import { SessionService } from './shared/auth/session.service.js';

@Module({
  imports: [
    StorageModule.forRoot({
      endpoint: storageConfig.R2_ENDPOINT,
      accessKeyId: storageConfig.R2_ACCESS_KEY_ID,
      secretAccessKey: storageConfig.R2_SECRET_ACCESS_KEY,
      bucket: storageConfig.R2_BUCKET,
      publicUrl: storageConfig.R2_PUBLIC_URL,
    }),
    BlogModule,
    AuthorModule,
    AttachmentModule,
    OpenApiModule,
    StoneManageModule,
    UserModule,
    ProvidersModule,
    VersionModule,
    FirebaseModule,
    AuthMiddlewareModule.forRoot({ path: '/api/auth' }),
    AuthModule.forRootAsync({
      useFactory: async () => {
        const authInstance = await initAuth();
        return { auth: authInstance };
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigServiceProvider,
    DotEnvServiceProvider,
    {
      provide: II18nService,
      useClass: I18nService,
    },
    I18nService,
    SessionService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
