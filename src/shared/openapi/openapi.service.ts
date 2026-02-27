import { Injectable, INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { ErrorCodes } from '../errors/error.codes.js';

@Injectable()
export class OpenApiService {
  private document: OpenAPIObject | null = null;

  setup(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle("Karasu Lab Identity API")
      .setDescription("The identity API for Karasu Lab services")
      .setVersion("1.0")
      .build();

    this.document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/api/docs", app, this.document);
    return this.document;
  }

  getDocument(): OpenAPIObject {
    if (!this.document) {
      throw ErrorCodes.SYSTEM.OPENAPI_UNINITIALIZED;
    }
    return this.document;
  }
}
