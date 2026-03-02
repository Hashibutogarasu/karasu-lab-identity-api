import { Controller, Get, Res } from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import type { Response } from 'express';
import { OpenApiService } from './openapi.service.js';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@AllowAnonymous()
@Controller('docs')
export class OpenApiController {
  constructor(private readonly openApiService: OpenApiService) {}

  @Get('json')
  @ApiOperation({ summary: 'Get OpenAPI JSON document' })
  @ApiResponse({ status: 200, description: 'Return the OpenAPI JSON document', type: 'object' })
  async getDocsJson(@Res() res: Response) {
    const document = await this.openApiService.getDocument();
    res.json(document);
  }
}
