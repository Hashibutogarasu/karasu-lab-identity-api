import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { AuthModule } from "@thallesp/nestjs-better-auth";
import { auth } from "./auth.js";
import { II18nService } from "./shared/i18n/i18n.service.interface.js";
import { I18nService } from "./shared/i18n/i18n.service.js";
import { I18nMiddleware } from "./shared/i18n/i18n.middleware.js";

@Module({
  imports: [AuthModule.forRoot({ auth })],
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
