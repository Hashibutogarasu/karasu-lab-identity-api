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
import { AllowAnonymous, AuthService } from '@thallesp/nestjs-better-auth';
import { Auth as BetterAuthType } from 'better-auth';
import { fromNodeHeaders } from 'better-auth/node';
import type { Request } from 'express';

import { ErrorCodes } from '../shared/errors/error.codes.js';
import { ZodValidationPipe } from '../shared/pipes/zod-validation.pipe.js';
import { BlogService, MAX_ATTACHMENT_SIZE } from './blog.service.js';
import type { AttachmentFile } from './blog.service.js';
import { createAttachmentSchema } from './dto/create-attachment.dto.js';
import type { CreateAttachmentDto } from './dto/create-attachment.dto.js';
import { createBlogSchema } from './dto/create-blog.dto.js';
import type { CreateBlogDto } from './dto/create-blog.dto.js';
import { updateAttachmentSchema } from './dto/update-attachment.dto.js';
import type { UpdateAttachmentDto } from './dto/update-attachment.dto.js';
import { updateBlogSchema } from './dto/update-blog.dto.js';
import type { UpdateBlogDto } from './dto/update-blog.dto.js';

@Controller('api/blogs')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly authService: AuthService<BetterAuthType>,
  ) {}

  // ---------------------------------------------------------------------------
  // Blog endpoints
  // NOTE: Static routes (@Get() and @Get('attachments')) must be declared
  //       before parameterised routes (@Get(':id'), @Get('attachments/:id'))
  //       so that Express matches them first.
  // ---------------------------------------------------------------------------

  /**
   * List blog posts. Public route, but auth changes the result set:
   * - Authenticated: own posts (all statuses) + published posts from others.
   * - Anonymous: published posts only.
   */
  @AllowAnonymous()
  @Get()
  async listBlogs(@Req() req: Request) {
    const session = await this.optionalSession(req);
    return this.blogService.listBlogs(session?.user.id);
  }

  /** Create a new blog post. Requires authentication. */
  @Post()
  async createBlog(
    @Req() req: Request,
    @Body(new ZodValidationPipe(createBlogSchema)) dto: CreateBlogDto,
  ) {
    const { user } = await this.requireSession(req);
    return this.blogService.createBlog(user.id, dto);
  }

  /** Get a blog post by ID. Public, but draft posts are author-only. */
  @AllowAnonymous()
  @Get(':id')
  async getBlog(@Req() req: Request, @Param('id') id: string) {
    const session = await this.optionalSession(req);
    return this.blogService.getBlog(id, session?.user.id);
  }

  /** Update a blog post. Requires authentication and ownership. */
  @Put(':id')
  async updateBlog(
    @Req() req: Request,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateBlogSchema)) dto: UpdateBlogDto,
  ) {
    const { user } = await this.requireSession(req);
    return this.blogService.updateBlog(id, user.id, dto);
  }

  /** Delete a blog post and all its attachments. Requires authentication and ownership. */
  @Delete(':id')
  async deleteBlog(@Req() req: Request, @Param('id') id: string) {
    const { user } = await this.requireSession(req);
    return this.blogService.deleteBlog(id, user.id);
  }

  // ---------------------------------------------------------------------------
  // Attachment endpoints
  // ---------------------------------------------------------------------------

  /**
   * List attachments. Public route, but auth changes the result set:
   * - Authenticated: own attachments (all statuses) + published from others.
   * - Anonymous: published attachments only.
   */
  @AllowAnonymous()
  @Get('attachments')
  async listAttachments(@Req() req: Request) {
    const session = await this.optionalSession(req);
    return this.blogService.listAttachments(session?.user.id);
  }

  /**
   * Upload an attachment to a blog post.
   * `:id` is the blog ID. Requires authentication. Max file size: 8 MB.
   * Accepts an optional `status` form field (archived | draft | published).
   */
  @Post('attachments/:id')
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: MAX_ATTACHMENT_SIZE } }))
  async createAttachment(
    @Req() req: Request,
    @Param('id') blogId: string,
    @UploadedFile() file: AttachmentFile,
    @Body(new ZodValidationPipe(createAttachmentSchema)) body: CreateAttachmentDto,
  ) {
    const { user } = await this.requireSession(req);
    return this.blogService.createAttachment(blogId, user.id, file, body);
  }

  /**
   * Get a presigned URL for an attachment.
   * `:id` is the attachment ID. Public.
   */
  @AllowAnonymous()
  @Get('attachments/:id')
  getAttachment(@Param('id') id: string) {
    return this.blogService.getAttachment(id);
  }

  /**
   * Replace an attachment's file and optionally update its status.
   * `:id` is the attachment ID. Requires authentication and ownership.
   */
  @Put('attachments/:id')
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: MAX_ATTACHMENT_SIZE } }))
  async updateAttachment(
    @Req() req: Request,
    @Param('id') id: string,
    @UploadedFile() file: AttachmentFile,
    @Body(new ZodValidationPipe(updateAttachmentSchema)) body: UpdateAttachmentDto,
  ) {
    const { user } = await this.requireSession(req);
    return this.blogService.updateAttachment(id, user.id, file, body);
  }

  /**
   * Delete an attachment.
   * `:id` is the attachment ID. Requires authentication and ownership.
   */
  @Delete('attachments/:id')
  async deleteAttachment(@Req() req: Request, @Param('id') id: string) {
    const { user } = await this.requireSession(req);
    return this.blogService.deleteAttachment(id, user.id);
  }

  // ---------------------------------------------------------------------------
  // Session helpers
  // ---------------------------------------------------------------------------

  /** Require an authenticated session; throw 401 if absent. */
  private async requireSession(req: Request) {
    const session = await this.authService.instance.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) throw ErrorCodes.AUTH.UNAUTHORIZED;
    return session;
  }

  /** Try to get the session; return null if the request is anonymous. */
  private optionalSession(req: Request) {
    return this.authService.instance.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
  }
}
