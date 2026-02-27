import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { OpenApiService } from './openapi.service.js';

@AllowAnonymous()
@Controller('api/docs')
export class OpenApiController {
  constructor(private readonly openApiService: OpenApiService) {}

  @Get('json')
  getDocsJson(@Res() res: Response) {
    const document = this.openApiService.getDocument();
    res.json(document);
  }
}
