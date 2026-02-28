import { Module } from '@nestjs/common';
import { OpenApiService } from './openapi.service.js';
import { OpenApiController } from './openapi.controller.js';

@Module({
  controllers: [OpenApiController],
  providers: [OpenApiService],
  exports: [OpenApiService],
})
export class OpenApiModule {}
