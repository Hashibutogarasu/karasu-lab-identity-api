import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';

import { SessionService } from '../../shared/auth/session.service.js';
import { RolesGuard } from '../../shared/auth/roles.guard.js';
import { ZodValidationPipe } from '../../shared/pipes/zod-validation.pipe.js';
import { GamesService } from './games.service.js';
import {
  CreateImageUploadUrlDto,
  createImageUploadUrlSchema,
} from './dto/create-image-upload-url.dto.js';
import { ImageUploadUrlResponseDto } from './dto/image-upload-url-response.dto.js';
import { AuthGuard } from '@thallesp/nestjs-better-auth';

@UseGuards(AuthGuard)
@UseGuards(RolesGuard)
@ApiTags('Stone Manage Images')
@Controller('apps/stonemanage')
export class StoneManageImagesController {
  constructor(
    private readonly service: GamesService,
    private readonly sessionService: SessionService,
  ) {}

  /**
   * Issue a presigned URL for uploading a game or stone image to R2.
   */
  @ApiOperation({
    summary: 'Issue a presigned upload URL for a game or stone image',
    description:
      'Returns a presigned PUT URL valid for 15 minutes. ' +
      'Upload the image using that URL, then pass the returned imageKey ' +
      'when creating or updating a game or stone.',
  })
  @ApiResponse({
    status: 201,
    description: 'Presigned upload URL issued.',
    type: ImageUploadUrlResponseDto,
  })
  @Post('images/upload-url')
  async issueImageUploadUrl(
    @Req() req: Request,
    @Body(new ZodValidationPipe(createImageUploadUrlSchema))
    dto: CreateImageUploadUrlDto,
  ) {
    const { user } = await this.sessionService.requireSession(req);
    return this.service.issueImageUploadUrl(user.id, dto);
  }
}
