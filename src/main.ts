import { dotEnvService } from './shared/config/dotenv.service.js';
dotEnvService.init();

import { NestFactory } from '@nestjs/core';
import { RequestMethod } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppModule } from './app.module.js';
import { authConfigFactory } from './services/auth/config/auth-config.service.js';
import { OpenApiService } from './shared/openapi/openapi.service.js';
import { GlobalExceptionFilter } from './shared/errors/global-exception.filter.js';
import { setupI18n } from './shared/i18n/i18n.setup.js';
import { II18nService } from './shared/i18n/i18n.service.interface.js';
import { configServiceFactory } from './shared/config/config.service.js';
import { IConfigService } from './shared/config/config.service.interface.js';
import { packageVersion } from './version.js';

async function bootstrap() {
  console.log(`Launching Karasu LAB API ver.${packageVersion}`);
  await setupI18n();
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.setGlobalPrefix('api', {
    exclude: [{ path: '.well-known/(.*)', method: RequestMethod.GET }],
  });

  const configService: IConfigService = configServiceFactory();

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
    const acceptLanguage = req.headers['accept-language'];
    let lang = 'ja';
    if (typeof acceptLanguage === 'string') {
      lang = acceptLanguage.split(',')[0];
    } else if (Array.isArray(acceptLanguage)) {
      lang = acceptLanguage[0];
    }
    await i18nService.setLanguage(lang);
    next();
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
