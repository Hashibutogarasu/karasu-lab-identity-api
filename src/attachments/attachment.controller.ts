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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { UserRole } from '@hashibutogarasu/common';
import type { Request } from 'express';

import { Roles } from '../shared/auth/roles.decorator.js';
import { RolesGuard } from '../shared/auth/roles.guard.js';
import { SessionService } from '../shared/auth/session.service.js';
import { ZodValidationPipe } from '../shared/pipes/zod-validation.pipe.js';
import { MAX_ATTACHMENT_SIZE } from '../attachments/attachment.service.js';
import type { AttachmentFile } from '../attachments/attachment.service.js';
import { AttachmentService } from './attachment.service.js';
import { AttachmentResponseDto } from '../blogs/dto/attachment-response.dto.js';
import {
  CreateAttachmentDto,
  createAttachmentSchema,
} from '../blogs/dto/create-attachment.dto.js';
import {
  UpdateAttachmentDto,
  updateAttachmentSchema,
} from '../blogs/dto/update-attachment.dto.js';
import { SuccessResponseDto } from '../blogs/dto/success-response.dto.js';
import {
  CreateAttachmentUploadUrlDto,
  createAttachmentUploadUrlSchema,
} from '../blogs/dto/create-attachment-upload-url.dto.js';
import { AttachmentUploadUrlResponseDto } from '../blogs/dto/attachment-upload-url-response.dto.js';
import {
  SyncAttachmentDto,
  syncAttachmentSchema,
} from '../blogs/dto/sync-attachment.dto.js';

@UseGuards(RolesGuard)
@ApiTags('Attachments')
@Controller('attachments')
export class AttachmentController {
  constructor(
    private readonly attachmentService: AttachmentService,
    private readonly sessionService: SessionService,
  ) {}

  /**
   * List attachments. Public route, but auth changes the result set:
   * - Authenticated: own attachments (all statuses) + published from others.
   * - Anonymous: published attachments only.
   */
  @AllowAnonymous()
  @ApiOperation({ summary: 'List attachments' })
  @ApiResponse({
    status: 200,
    description: 'Return a list of attachments.',
    type: [AttachmentResponseDto],
  })
  @Get()
  async listAttachments(@Req() req: Request) {
    const session = await this.sessionService.optionalSession(req);
    return this.attachmentService.listAttachments(session?.user.id);
  }

  /**
   * Issue a presigned URL for uploading an attachment directly to R2 storage.
   * The caller must supply the MIME type of the file to be uploaded so the
   * presigned URL can enforce it.  After the upload the caller must invoke
   * `POST /attachments/:id/sync` to register the file in Firestore.
   * Requires ADMIN role.
   */
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Issue a presigned upload URL for a blog attachment',
    description:
      'Returns a presigned PUT URL valid for 15 minutes. ' +
      'Upload the file using that URL, then call POST /attachments/:id/sync to register it.',
  })
  @ApiResponse({
    status: 201,
    description: 'Presigned upload URL issued successfully.',
    type: AttachmentUploadUrlResponseDto,
  })
  @Post(':blogId/upload-url')
  async issueAttachmentUploadUrl(
    @Req() req: Request,
    @Param('blogId') blogId: string,
    @Body(new ZodValidationPipe(createAttachmentUploadUrlSchema))
    body: CreateAttachmentUploadUrlDto,
  ) {
    const { user } = await this.sessionService.requireSession(req);
    return this.attachmentService.issueAttachmentUploadUrl(blogId, user.id, body);
  }

  /**
   * Sync an attachment from R2 storage into Firestore after a direct upload.
   * The server verifies that the object exists at the expected key before
   * creating the Firestore metadata document.
   * `:id` is the attachment ID returned by `POST /attachments/:blogId/upload-url`.
   * Requires ADMIN role.
   */
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Sync a directly-uploaded attachment from R2 into Firestore',
    description:
      'Verifies that the object exists in R2 and then creates the attachment ' +
      'metadata document in Firestore. Use the attachment ID from the upload-url response.',
  })
  @ApiResponse({
    status: 201,
    description: 'Attachment metadata synced to Firestore.',
    type: AttachmentResponseDto,
  })
  @Post(':id/sync')
  async syncAttachmentFromStorage(
    @Req() req: Request,
    @Param('id') attachmentId: string,
    @Body(new ZodValidationPipe(syncAttachmentSchema)) body: SyncAttachmentDto,
  ) {
    const { user } = await this.sessionService.requireSession(req);
    return this.attachmentService.syncAttachmentFromStorage(
      attachmentId,
      body.blogId,
      user.id,
      body,
    );
  }

  /**
   * Upload an attachment to a blog post.
   * `:blogId` is the blog ID. Requires ADMIN role. Max file size: 8 MB.
   * Accepts an optional `status` form field (archived | draft | published).
   */
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Upload an attachment' })
  @ApiResponse({
    status: 201,
    description: 'The attachment has been successfully created.',
    type: AttachmentResponseDto,
  })
  @Post(':blogId')
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: MAX_ATTACHMENT_SIZE } }),
  )
  async createAttachment(
    @Req() req: Request,
    @Param('blogId') blogId: string,
    @UploadedFile() file: AttachmentFile,
    @Body(new ZodValidationPipe(createAttachmentSchema))
    body: CreateAttachmentDto,
  ) {
    const { user } = await this.sessionService.requireSession(req);
    return this.attachmentService.createAttachment(blogId, user.id, file, body);
  }

  /**
   * Get a presigned URL for an attachment.
   * `:id` is the attachment ID. Public.
   */
  @AllowAnonymous()
  @ApiOperation({ summary: 'Get an attachment presigned URL' })
  @ApiResponse({
    status: 200,
    description: 'Return a presigned URL.',
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string' },
        metadata: { $ref: '#/components/schemas/AttachmentResponseDto' },
      },
    },
  })
  @Get(':id')
  getAttachment(@Param('id') id: string) {
    return this.attachmentService.getAttachment(id);
  }

  /**
   * Replace an attachment's file and optionally update its status.
   * `:id` is the attachment ID. Requires ADMIN role.
   */
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update an attachment' })
  @ApiResponse({
    status: 200,
    description: 'The attachment has been successfully updated.',
    type: AttachmentResponseDto,
  })
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: MAX_ATTACHMENT_SIZE } }),
  )
  async updateAttachment(
    @Req() req: Request,
    @Param('id') id: string,
    @UploadedFile() file: AttachmentFile,
    @Body(new ZodValidationPipe(updateAttachmentSchema))
    body: UpdateAttachmentDto,
  ) {
    const { user } = await this.sessionService.requireSession(req);
    return this.attachmentService.updateAttachment(id, user.id, file, body);
  }

  /**
   * Delete an attachment.
   * `:id` is the attachment ID. Requires ADMIN role.
   */
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete an attachment' })
  @ApiResponse({
    status: 200,
    description: 'The attachment has been successfully deleted.',
    type: SuccessResponseDto,
  })
  @Delete(':id')
  async deleteAttachment(@Req() req: Request, @Param('id') id: string) {
    const { user } = await this.sessionService.requireSession(req);
    return this.attachmentService.deleteAttachment(id, user.id);
  }
}
