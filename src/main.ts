import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { ConfigService } from "./shared/config/config.service.js";
import { authConfigFactory } from "./services/auth/auth-config.service.js";
import { OpenApiService } from "./shared/openapi/openapi.service.js";
import { GlobalExceptionFilter } from "./shared/errors/global-exception.filter.js";
import { DocsAuthMiddleware } from "./shared/openapi/docs-auth.middleware.js";

async function bootstrap() {
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

  const openApiService = app.get(OpenApiService);
  const docsAuthMiddleware = app.get(DocsAuthMiddleware);
  app.use("/api/docs", (req: any, res: any, next: any) => {
    docsAuthMiddleware.use(req, res, next).catch(next);
  });

  openApiService.setup(app);

  const port = process.env.PORT ?? 3001;
  await app.listen(port, '0.0.0.0');
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
