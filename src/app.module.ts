import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { AuthModule } from "@thallesp/nestjs-better-auth";
import { II18nService } from "./shared/i18n/i18n.service.interface.js";
import { I18nService } from "./shared/i18n/i18n.service.js";
import { StorageModule } from "./storage/storage.module.js";
import { BlogModule } from "./blogs/blog.module.js";
import { AuthorModule } from "./authors/author.module.js";
import { AttachmentModule } from "./attachments/attachment.module.js";
import { OpenApiModule } from "./shared/openapi/openapi.module.js";
import { AuthMiddlewareModule } from "./shared/auth/auth-middleware.module.js";
import { StoneManageModule } from "./apps/stonemanage/stone-manage.module.js";
import { initAuth } from "./auth.js";
import { DotEnvServiceProvider } from "./shared/config/dotenv.service.js";

@Module({
  imports: [
    StorageModule,
    BlogModule,
    AuthorModule,
    AttachmentModule,
    OpenApiModule,
    StoneManageModule,
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
    DotEnvServiceProvider,
    {
      provide: II18nService,
      useClass: I18nService,
    },
    I18nService,
  ],
})
export class AppModule {}
