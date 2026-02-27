import { Module } from '@nestjs/common';
import { OpenApiService } from './openapi.service.js';
import { OpenApiController } from './openapi.controller.js';
import { DocsAuthMiddleware } from './docs-auth.middleware.js';

@Module({
  controllers: [OpenApiController],
  providers: [OpenApiService, DocsAuthMiddleware],
  exports: [OpenApiService],
})
export class OpenApiModule {}
