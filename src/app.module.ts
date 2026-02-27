import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { AuthModule } from "@thallesp/nestjs-better-auth";
import { II18nService } from "./shared/i18n/i18n.service.interface.js";
import { I18nService } from "./shared/i18n/i18n.service.js";
import { StorageModule } from "./storage/storage.module.js";
import { BlogModule } from "./blogs/blog.module.js";
import { OpenApiModule } from "./shared/openapi/openapi.module.js";
import { AuthMiddlewareModule } from "./shared/auth/auth-middleware.module.js";
import { initAuth } from "./auth.js";
import { DocsAuthMiddleware } from "./shared/openapi/docs-auth.middleware.js";

@Module({
  imports: [
    StorageModule,
    BlogModule,
    OpenApiModule,
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
    {
      provide: II18nService,
      useClass: I18nService,
    },
    I18nService,
    DocsAuthMiddleware,
  ],
})
export class AppModule {}
