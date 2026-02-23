import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  const allowedOrigins = [
    'https://sso.karasu256.com',
    'https://karasu256.com',
    'https://www.karasu256.com',
    'https://id.karasu256.com',
    ...process.env.NODE_ENV === 'development' ? [
      'http://localhost:3001',
      'http://localhost:3000',
    ] : [],
  ];

  app.enableCors({
    origin: allowedOrigins,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle("Karasu Lab Identity API")
    .setDescription("The identity API for Karasu Lab services")
    .setVersion("1.0")
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, documentFactory);

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
}

bootstrap();
