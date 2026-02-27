import { Inject, Injectable } from '@nestjs/common';
import cuid from 'cuid';

import { getPrisma } from '../prisma.js';
import { createAPIError, ErrorCodes } from '../shared/errors/error.codes.js';
import { IObjectStorageService } from '../storage/object-storage.interface.js';
import type { IObjectStorage } from '../storage/object-storage.interface.js';
import type { CreateAttachmentDto } from './dto/create-attachment.dto.js';
import type { CreateBlogDto } from './dto/create-blog.dto.js';
import type { Status } from './dto/status.schema.js';
import type { UpdateAttachmentDto } from './dto/update-attachment.dto.js';
import type { UpdateBlogDto } from './dto/update-blog.dto.js';

/** Maximum allowed attachment size: 8 MB (fits a 4K JPEG/PNG/WebP image). */
export const MAX_ATTACHMENT_SIZE = 8 * 1024 * 1024;

export interface AttachmentFile {
  buffer: Buffer;
  mimetype: string;
  size: number;
}

/**
 * Builds the Prisma `where` clause for list queries.
 * - Authenticated: own records (all statuses) OR published records from others.
 * - Anonymous: published only.
 */
function visibilityWhere(userId?: string) {
  if (userId) {
    return { OR: [{ authorId: userId }, { status: 'published' as Status }] };
  }
  return { status: 'published' as Status };
}

@Injectable()
export class BlogService {
  private readonly prisma = getPrisma();

  constructor(
    @Inject(IObjectStorageService) private readonly storage: IObjectStorage,
  ) {}

  /**
   * List blogs.
   * - Authenticated: own posts (all statuses) + published posts from others.
   * - Anonymous: published posts only.
   */
  async listBlogs(userId?: string) {
    return await this.prisma.blog.findMany({
      where: visibilityWhere(userId),
      include: { attachments: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * List attachments.
   * - Authenticated: own attachments (all statuses) + published attachments from others.
   * - Anonymous: published attachments only.
   */
  async listAttachments(userId?: string) {
    return await this.prisma.attachmentMetadata.findMany({
      where: visibilityWhere(userId),
      orderBy: { createdAt: 'desc' },
    });
  }

  async createBlog(authorId: string, dto: CreateBlogDto) {
    return await this.prisma.blog.create({
      data: {
        id: cuid(),
        content: dto.content,
        authorId,
        ...(dto.status !== undefined && { status: dto.status }),
        ...(dto.locked !== undefined && { locked: dto.locked }),
      },
      include: { attachments: true },
    });
  }

  async getBlog(id: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
      include: { attachments: true },
    });
    if (!blog) throw createAPIError(ErrorCodes.BLOG.NOT_FOUND);
    return blog;
  }

  async updateBlog(id: string, authorId: string, dto: UpdateBlogDto) {
    const blog = await this.prisma.blog.findUnique({ where: { id } });
    if (!blog) throw createAPIError(ErrorCodes.BLOG.NOT_FOUND);
    if (blog.authorId !== authorId) throw createAPIError(ErrorCodes.BLOG.FORBIDDEN);
    if (blog.locked) throw createAPIError(ErrorCodes.BLOG.LOCKED);

    return this.prisma.blog.update({
      where: { id },
      data: {
        ...(dto.content !== undefined && { content: dto.content }),
        ...(dto.status !== undefined && { status: dto.status }),
        ...(dto.locked !== undefined && { locked: dto.locked }),
      },
      include: { attachments: true },
    });
  }

  async deleteBlog(id: string, authorId: string) {
    const blog = await this.prisma.blog.findUnique({ where: { id } });
    if (!blog) throw createAPIError(ErrorCodes.BLOG.NOT_FOUND);
    if (blog.authorId !== authorId) throw createAPIError(ErrorCodes.BLOG.FORBIDDEN);

    // Remove all attachments from storage before deleting the blog record.
    const attachments = await this.prisma.attachmentMetadata.findMany({
      where: { blogId: id },
    });
    await Promise.all(attachments.map((a) => this.storage.deleteObject(a.key)));

    await this.prisma.blog.delete({ where: { id } });
  }

  async createAttachment(
    blogId: string,
    authorId: string,
    file: AttachmentFile,
    dto: CreateAttachmentDto,
  ) {
    const blog = await this.prisma.blog.findUnique({ where: { id: blogId } });
    if (!blog) throw createAPIError(ErrorCodes.BLOG.NOT_FOUND);
    if (blog.locked) throw createAPIError(ErrorCodes.BLOG.LOCKED);
    if (file.size > MAX_ATTACHMENT_SIZE) throw createAPIError(ErrorCodes.BLOG.ATTACHMENT_TOO_LARGE);

    const attachmentId = cuid();
    const key = `blogs/${blogId}/attachments/${attachmentId}`;

    await this.storage.putObject(key, file.buffer, file.mimetype);

    return this.prisma.attachmentMetadata.create({
      data: {
        id: attachmentId,
        blogId,
        key,
        contentType: file.mimetype,
        size: file.size,
        ...(dto.status !== undefined && { status: dto.status }),
        authorId,
      },
    });
  }

  async getAttachment(id: string) {
    const metadata = await this.prisma.attachmentMetadata.findUnique({ where: { id } });
    if (!metadata) throw createAPIError(ErrorCodes.BLOG.ATTACHMENT_NOT_FOUND);

    const url = await this.storage.getPresignedUrl(metadata.key);
    return { url, metadata };
  }

  async updateAttachment(
    id: string,
    authorId: string,
    file: AttachmentFile,
    dto: UpdateAttachmentDto,
  ) {
    const metadata = await this.prisma.attachmentMetadata.findUnique({ where: { id } });
    if (!metadata) throw createAPIError(ErrorCodes.BLOG.ATTACHMENT_NOT_FOUND);
    if (metadata.authorId !== authorId) throw createAPIError(ErrorCodes.BLOG.FORBIDDEN);

    const blog = await this.prisma.blog.findUnique({ where: { id: metadata.blogId } });
    if (blog?.locked) throw createAPIError(ErrorCodes.BLOG.LOCKED);

    if (file.size > MAX_ATTACHMENT_SIZE) throw createAPIError(ErrorCodes.BLOG.ATTACHMENT_TOO_LARGE);

    await this.storage.putObject(metadata.key, file.buffer, file.mimetype);

    return this.prisma.attachmentMetadata.update({
      where: { id },
      data: {
        contentType: file.mimetype,
        size: file.size,
        ...(dto.status !== undefined && { status: dto.status }),
      },
    });
  }

  async deleteAttachment(id: string, authorId: string) {
    const metadata = await this.prisma.attachmentMetadata.findUnique({ where: { id } });
    if (!metadata) throw createAPIError(ErrorCodes.BLOG.ATTACHMENT_NOT_FOUND);
    if (metadata.authorId !== authorId) throw createAPIError(ErrorCodes.BLOG.FORBIDDEN);

    await this.storage.deleteObject(metadata.key);
    await this.prisma.attachmentMetadata.delete({ where: { id } });
  }
}
