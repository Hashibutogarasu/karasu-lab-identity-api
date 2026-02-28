import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import type { Request } from 'express';

import { SessionService } from '../shared/auth/session.service.js';
import { ZodValidationPipe } from '../shared/pipes/zod-validation.pipe.js';
import { BlogService, MAX_ATTACHMENT_SIZE } from '../blogs/blog.service.js';
import type { AttachmentFile } from '../blogs/blog.service.js';
import { createAttachmentSchema } from '../blogs/dto/create-attachment.dto.js';
import type { CreateAttachmentDto } from '../blogs/dto/create-attachment.dto.js';
import { updateAttachmentSchema } from '../blogs/dto/update-attachment.dto.js';
import type { UpdateAttachmentDto } from '../blogs/dto/update-attachment.dto.js';

@Controller('api/attachments')
export class AttachmentController {
  constructor(
    private readonly blogService: BlogService,
    private readonly sessionService: SessionService,
  ) {}

  /**
   * List attachments. Public route, but auth changes the result set:
   * - Authenticated: own attachments (all statuses) + published from others.
   * - Anonymous: published attachments only.
   */
  @AllowAnonymous()
  @Get()
  async listAttachments(@Req() req: Request) {
    const session = await this.sessionService.optionalSession(req);
    return this.blogService.listAttachments(session?.user.id);
  }

  /**
   * Upload an attachment to a blog post.
   * `:blogId` is the blog ID. Requires authentication. Max file size: 8 MB.
   * Accepts an optional `status` form field (archived | draft | published).
   */
  @Post(':blogId')
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: MAX_ATTACHMENT_SIZE } }))
  async createAttachment(
    @Req() req: Request,
    @Param('blogId') blogId: string,
    @UploadedFile() file: AttachmentFile,
    @Body(new ZodValidationPipe(createAttachmentSchema)) body: CreateAttachmentDto,
  ) {
    const { user } = await this.sessionService.requireSession(req);
    return this.blogService.createAttachment(blogId, user.id, file, body);
  }

  /**
   * Get a presigned URL for an attachment.
   * `:id` is the attachment ID. Public.
   */
  @AllowAnonymous()
  @Get(':id')
  getAttachment(@Param('id') id: string) {
    return this.blogService.getAttachment(id);
  }

  /**
   * Replace an attachment's file and optionally update its status.
   * `:id` is the attachment ID. Requires authentication and ownership.
   */
  @Put(':id')
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: MAX_ATTACHMENT_SIZE } }))
  async updateAttachment(
    @Req() req: Request,
    @Param('id') id: string,
    @UploadedFile() file: AttachmentFile,
    @Body(new ZodValidationPipe(updateAttachmentSchema)) body: UpdateAttachmentDto,
  ) {
    const { user } = await this.sessionService.requireSession(req);
    return this.blogService.updateAttachment(id, user.id, file, body);
  }

  /**
   * Delete an attachment.
   * `:id` is the attachment ID. Requires authentication and ownership.
   */
  @Delete(':id')
  async deleteAttachment(@Req() req: Request, @Param('id') id: string) {
    const { user } = await this.sessionService.requireSession(req);
    return this.blogService.deleteAttachment(id, user.id);
  }
}
