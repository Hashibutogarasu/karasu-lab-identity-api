import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import type { Request } from 'express';

import { SessionService } from '../shared/auth/session.service.js';
import { ZodValidationPipe } from '../shared/pipes/zod-validation.pipe.js';
import { BlogService } from './blog.service.js';
import { createBlogSchema } from './dto/create-blog.dto.js';
import type { CreateBlogDto } from './dto/create-blog.dto.js';
import { listBlogsQuerySchema } from './dto/list-blogs-query.dto.js';
import type { ListBlogsQueryDto } from './dto/list-blogs-query.dto.js';
import { updateBlogSchema } from './dto/update-blog.dto.js';
import type { UpdateBlogDto } from './dto/update-blog.dto.js';

@Controller('api/blogs')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly sessionService: SessionService,
  ) {}

  /**
   * List blog posts. Public route, but auth changes the result set:
   * - Authenticated: own posts (all statuses) + published posts from others.
   * - Anonymous: published posts only.
   */
  @AllowAnonymous()
  @Get()
  async listBlogs(
    @Req() req: Request,
    @Query(new ZodValidationPipe(listBlogsQuerySchema)) query: ListBlogsQueryDto,
  ) {
    const session = await this.sessionService.optionalSession(req);
    return this.blogService.listBlogs(session?.user.id, query);
  }

  /**
   * List only the authenticated user's own blog posts (all statuses).
   * Defined before :id to avoid route shadowing.
   */
  @Get('mine')
  async listMyBlogs(
    @Req() req: Request,
    @Query(new ZodValidationPipe(listBlogsQuerySchema)) query: ListBlogsQueryDto,
  ) {
    const { user } = await this.sessionService.requireSession(req);
    return this.blogService.listMyBlogs(user.id, query);
  }

  /** Create a new blog post. Requires authentication. */
  @Post()
  async createBlog(
    @Req() req: Request,
    @Body(new ZodValidationPipe(createBlogSchema)) dto: CreateBlogDto,
  ) {
    const { user } = await this.sessionService.requireSession(req);
    return this.blogService.createBlog(user.id, dto);
  }

  /** Get a blog post by ID. Public, but draft posts are author-only. */
  @AllowAnonymous()
  @Get(':id')
  async getBlog(@Req() req: Request, @Param('id') id: string) {
    const session = await this.sessionService.optionalSession(req);
    return this.blogService.getBlog(id, session?.user.id);
  }

  /** Update a blog post. Requires authentication and ownership. */
  @Put(':id')
  async updateBlog(
    @Req() req: Request,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateBlogSchema)) dto: UpdateBlogDto,
  ) {
    const { user } = await this.sessionService.requireSession(req);
    return this.blogService.updateBlog(id, user.id, dto);
  }

  /** Delete a blog post and all its attachments. Requires authentication and ownership. */
  @Delete(':id')
  async deleteBlog(@Req() req: Request, @Param('id') id: string) {
    const { user } = await this.sessionService.requireSession(req);
    return this.blogService.deleteBlog(id, user.id);
  }
}
