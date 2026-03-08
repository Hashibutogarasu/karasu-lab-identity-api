/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import getPrisma from '../prisma.js';
import { AbstractRepository } from '../shared/repository/abstract.repository.js';
import { IFirebaseAdminProvider } from '../shared/firebase/firebase-admin.provider.interface.js';
import { ErrorCodes } from '../shared/errors/error.codes.js';
import { UserResponseDto } from '../blogs/dto/user-response.dto.js';
import { IRepository } from '../shared/repository/repository.interface.js';

@Injectable()
export class AuthorService extends AbstractRepository<UserResponseDto> implements IRepository<UserResponseDto> {
  private readonly prisma: PrismaClient = getPrisma();

  constructor(firebase: IFirebaseAdminProvider) {
    // We pass 'users' as a placeholder collection name, but we will mostly use Prisma for this service
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _data: Partial<UserResponseDto>,
  ): Promise<UserResponseDto> {
    throw ErrorCodes.BLOG.NOT_IMPLEMENTED;
  }

  /**
   * Update is not implemented for authors via this API.
   */
  override async update(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _data: Partial<UserResponseDto>,
  ): Promise<UserResponseDto> {
    throw ErrorCodes.BLOG.NOT_IMPLEMENTED;
  }

  /**
   * Delete is not implemented for authors via this API.
   */
  override async delete(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _id: string,
  ): Promise<void> {
    throw ErrorCodes.BLOG.NOT_IMPLEMENTED;
  }
}
