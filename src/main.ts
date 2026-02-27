import { NestFactory } from "@nestjs/core";
import { Request, Response, NextFunction } from "express";
import { AppModule } from "./app.module.js";
import { ConfigService } from "./shared/config/config.service.js";
import { authConfigFactory } from "./services/auth/auth-config.service.js";
import { OpenApiService } from "./shared/openapi/openapi.service.js";
import { GlobalExceptionFilter } from "./shared/errors/global-exception.filter.js";
import { DocsAuthMiddleware } from "./shared/openapi/docs-auth.middleware.js";
import { setupI18n } from "./shared/i18n/i18n.setup.js";
import { II18nService } from "./shared/i18n/i18n.service.interface.js";

async function bootstrap() {
  await setupI18n();
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.useGlobalFilters(new GlobalExceptionFilter());

  const configService = new ConfigService(process.env.NODE_ENV);
  const authConfigInstance = authConfigFactory(configService);
  const allowedOrigins = authConfigInstance.getTrustedOrigins();
  const allowedHeaders = authConfigInstance.getAllowedHeaders();
  const allowCredentials = authConfigInstance.getCredentials();

  app.enableCors({
    origin: allowedOrigins,
    allowedHeaders: allowedHeaders,
    credentials: allowCredentials,
  });

  const i18nService = app.get<II18nService>(II18nService);
  app.use(async (req: Request, _res: Response, next: NextFunction) => {
    const acceptLanguage = req.headers["accept-language"];
    let lang = "ja";
    if (typeof acceptLanguage === "string") {
      lang = acceptLanguage.split(",")[0];
    } else if (Array.isArray(acceptLanguage)) {
      lang = acceptLanguage[0];
    }
    await i18nService.setLanguage(lang);
    next();
  });

  const openApiService = app.get(OpenApiService);
  const docsAuthMiddleware = app.get<DocsAuthMiddleware>(DocsAuthMiddleware);
  app.use("/api/docs", (req: Request, res: Response, next: NextFunction) => {
    void docsAuthMiddleware.use(req as any, res as any, next as any).catch(next);
  });

  openApiService.setup(app);

  const port = process.env.PORT ?? 3001;
  await app.listen(port, '0.0.0.0');
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
