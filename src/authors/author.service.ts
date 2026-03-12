/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import getPrisma from '../prisma.js';
import { AbstractRepository } from '../shared/repository/abstract.repository.js';
import { IFirebaseAdminProvider } from '../shared/firebase/firebase-admin.provider.interface.js';
import { ErrorCodes } from '../shared/errors/error.codes.js';
import { UserResponseDto } from '../blogs/dto/user-response.dto.js';
import { IRepository } from '../shared/repository/repository.interface.js';
import type { BasePaginationQueryDto } from '../shared/dto/pagination-query.dto.js';
import type { PaginatedResult } from '../shared/types/pagination.types.js';

@Injectable()
export class AuthorService extends AbstractRepository<UserResponseDto> implements IRepository<UserResponseDto> {
  private readonly prisma: PrismaClient = getPrisma();

  constructor(@Inject(IFirebaseAdminProvider) firebase: IFirebaseAdminProvider) {
    super(firebase, 'users');
  }

  /**
   * List all authors.
   * Only returns users who have written at least one blog post or simply all users (impl detail).
   * For now, returns users with id, name, and image.
   */
  async listAuthors(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
      },
    });
    return users.map(user => ({
      id: user.id,
      name: user.name,
      image: user.image ?? null,
    }));
  }

  async listAuthorsPaged(
    query: BasePaginationQueryDto = { limit: 20 },
  ): Promise<PaginatedResult<UserResponseDto>> {
    const { limit, cursor } = query;

    const users = await this.prisma.user.findMany({
      take: limit + 1,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      select: { id: true, name: true, image: true },
      orderBy: { id: 'asc' },
    });

    const hasMore = users.length > limit;
    const paged = hasMore ? users.slice(0, limit) : users;
    const nextCursor = hasMore ? paged[paged.length - 1].id : null;
    const data = paged.map(u => ({ id: u.id, name: u.name, image: u.image ?? null }));

    return { data, total: null, page: null, limit, totalPages: null, nextCursor, hasMore };
  }

  /**
   * Retrieves a user by ID using Prisma.
   * @param id User ID to retrieve.
   */
  override async getById(id: string): Promise<UserResponseDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        image: true,
      },
    });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      image: user.image ?? null,
    };
  }

  /**
   * Create is not implemented for authors via this API.
   */
  override async create(
    _id: string,
    _data: Partial<UserResponseDto>,
  ): Promise<UserResponseDto> {
    throw ErrorCodes.BLOG.NOT_IMPLEMENTED;
  }

  /**
   * Update is not implemented for authors via this API.
   */
  override async update(
    _id: string,
    _data: Partial<UserResponseDto>,
  ): Promise<UserResponseDto> {
    throw ErrorCodes.BLOG.NOT_IMPLEMENTED;
  }

  /**
   * Delete is not implemented for authors via this API.
   */
  override async delete(
    _id: string,
  ): Promise<void> {
    throw ErrorCodes.BLOG.NOT_IMPLEMENTED;
  }
}
