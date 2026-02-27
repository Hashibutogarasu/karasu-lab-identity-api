import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { AuthModule } from "@thallesp/nestjs-better-auth";
import { II18nService } from "./shared/i18n/i18n.service.interface.js";
import { I18nService } from "./shared/i18n/i18n.service.js";
import { I18nMiddleware } from "./shared/i18n/i18n.middleware.js";
import { StorageModule } from "./storage/storage.module.js";

@Module({
  imports: [
    StorageModule,
    AuthModule.forRootAsync({
      useFactory: async () => {
        const { initAuth } = await import("./auth.js");
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
  ],
})
export class AppModule implements NestModule {
  constructor(private readonly i18nService: I18nService) {
    this.i18nService.init();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(I18nMiddleware).forRoutes('*');
  }
}
