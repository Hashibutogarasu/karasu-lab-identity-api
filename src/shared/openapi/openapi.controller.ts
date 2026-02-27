import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { OpenApiService } from './openapi.service.js';
import { AuthGuard } from '@thallesp/nestjs-better-auth';

@UseGuards(AuthGuard)
@Controller('api/docs')
export class OpenApiController {
  constructor(private readonly openApiService: OpenApiService) {}

  @Get('json')
  getDocsJson(@Res() res: Response) {
    const document = this.openApiService.getDocument();
    res.json(document);
  }
}
