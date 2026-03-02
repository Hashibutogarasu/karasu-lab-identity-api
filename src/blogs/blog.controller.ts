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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import type { Request } from 'express';

import { SessionService } from '../shared/auth/session.service.js';
import { ZodValidationPipe } from '../shared/pipes/zod-validation.pipe.js';
import { BlogService } from './blog.service.js';
import {
  BlogResponseDto,
  PaginatedBlogResponseDto,
} from './dto/blog-response.dto.js';
import { CreateBlogDto, createBlogSchema } from './dto/create-blog.dto.js';
import { GetAuthorsDto, getAuthorsSchema } from './dto/get-authors.dto.js';
import {
  ListBlogsQueryDto,
  listBlogsQuerySchema,
} from './dto/list-blogs-query.dto.js';
import { UpdateBlogDto, updateBlogSchema } from './dto/update-blog.dto.js';
import { UserResponseDto } from './dto/user-response.dto.js';
import { SuccessResponseDto } from './dto/success-response.dto.js';

@ApiTags('Blogs')
@Controller('blogs')
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
  @ApiOperation({ summary: 'List blog posts' })
  @ApiResponse({
    status: 200,
    description: 'Return a list of blog posts.',
    type: PaginatedBlogResponseDto,
  })
  @Get()
  async listBlogs(
    @Req() req: Request,
    @Query(new ZodValidationPipe(listBlogsQuerySchema)) query: ListBlogsQueryDto,
  ) {
    const session = await this.sessionService.optionalSession(req);
    return this.blogService.listBlogs(session?.user.id, query);
  }

  /**
   * Fetch author profiles by IDs.
   */
  @AllowAnonymous()
  @ApiOperation({ summary: 'Fetch author profiles by IDs' })
  @ApiResponse({
    status: 201,
    description: 'Return author profiles.',
    type: [UserResponseDto],
  })
  @Post('authors')
  async getAuthors(
    @Body(new ZodValidationPipe(getAuthorsSchema)) dto: GetAuthorsDto,
  ) {
    return this.blogService.getAuthors(dto.ids);
  }

  /**
   * List only the authenticated user's own blog posts (all statuses).
   * Defined before :id to avoid route shadowing.
   */
  @ApiOperation({ summary: 'List own blog posts' })
  @ApiResponse({
    status: 200,
    description: 'Return a list of own blog posts.',
    type: PaginatedBlogResponseDto,
  })
  @Get('mine')
  async listMyBlogs(
    @Req() req: Request,
    @Query(new ZodValidationPipe(listBlogsQuerySchema)) query: ListBlogsQueryDto,
  ) {
    const { user } = await this.sessionService.requireSession(req);
    return this.blogService.listMyBlogs(user.id, query);
  }

  /** Create a new blog post. Requires authentication. */
  @ApiOperation({ summary: 'Create a new blog post' })
  @ApiResponse({
    status: 201,
    description: 'The blog post has been successfully created.',
    type: BlogResponseDto,
  })
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
  @ApiOperation({ summary: 'Get a blog post by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return a blog post.',
    type: BlogResponseDto,
  })
  @Get(':id')
  async getBlog(@Req() req: Request, @Param('id') id: string) {
    const session = await this.sessionService.optionalSession(req);
    return this.blogService.getBlog(id, session?.user.id);
  }

  /** Update a blog post. Requires authentication and ownership. */
  @ApiOperation({ summary: 'Update a blog post' })
  @ApiResponse({
    status: 200,
    description: 'The blog post has been successfully updated.',
    type: BlogResponseDto,
  })
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
  @ApiOperation({ summary: 'Delete a blog post' })
  @ApiResponse({
    status: 200,
    description: 'The blog post has been successfully deleted.',
    type: SuccessResponseDto,
  })
  @Delete(':id')
  async deleteBlog(@Req() req: Request, @Param('id') id: string) {
    const { user } = await this.sessionService.requireSession(req);
    return this.blogService.deleteBlog(id, user.id);
  }
}
