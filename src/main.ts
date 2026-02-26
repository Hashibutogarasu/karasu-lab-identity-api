/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Auth as BetterAuthType } from "better-auth";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { toNodeHandler } from "better-auth/node";
import { AuthService } from "@thallesp/nestjs-better-auth";
import type { Request, Response, NextFunction } from "express";
import { ConfigService } from "./shared/config/config.service.js";
import { authConfigFactory } from "./services/auth/auth-config.service.js";

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

  const authService = app.get<AuthService<BetterAuthType>>(AuthService);
  const auth = authService.instance;

  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.use((req: Request, res: Response, next: NextFunction) => {
    if (req.url?.startsWith('/api/auth')) {
      return toNodeHandler(auth)(req as any, res as any);
    }
    next();
  });

  const config = new DocumentBuilder()
    .setTitle("Karasu Lab Identity API")
    .setDescription("The identity API for Karasu Lab services")
    .setVersion("1.0")
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, documentFactory);

  const port = process.env.PORT ?? 3001;
  await app.listen(port, '0.0.0.0');
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
