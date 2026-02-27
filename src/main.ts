import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { ConfigService } from "./shared/config/config.service.js";
import { authConfigFactory } from "./services/auth/auth-config.service.js";
import { OpenApiService } from "./shared/openapi/openapi.service.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

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
  openApiService.setup(app);

  const port = process.env.PORT ?? 3001;
  await app.listen(port, '0.0.0.0');
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
