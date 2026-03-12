import { Inject, Injectable } from '@nestjs/common';
import cuid from 'cuid';

import { GamesRepository } from './repositories/games.repository.js';
import { StonesRepository } from './repositories/stones.repository.js';
import { LogsRepository } from './repositories/logs.repository.js';
import { ErrorCodes } from '../../shared/errors/error.codes.js';
import { Deletable } from '../../shared/deletable/deletable.decorator.js';
import type { IDeletable } from '../../shared/deletable/deletable.interface.js';
import { CreateGameDto } from './dto/create-game.dto.js';
import { UpdateGameDto } from './dto/update-game.dto.js';
import { GameEntity } from './entities/game.entity.js';
import { IObjectStorageService } from '../../storage/object-storage.interface.js';
import type { IObjectStorage } from '../../storage/object-storage.interface.js';
import { CreateImageUploadUrlDto } from './dto/create-image-upload-url.dto.js';
import type { PaginatedResult } from '../../shared/types/pagination.types.js';
import { BasePaginationQueryDto } from '../../shared/dto/pagination-query.dto.js';

const UPLOAD_PRESIGNED_URL_EXPIRES_IN = 15 * 60;

/**
 * Service for managing games and issuing image upload URLs.
 */
@Deletable(5)
@Injectable()
export class GamesService implements IDeletable {
  constructor(
    private readonly gamesRepo: GamesRepository,
    private readonly stonesRepo: StonesRepository,
    private readonly logsRepo: LogsRepository,
    @Inject(IObjectStorageService) private readonly storage: IObjectStorage,
  ) {}

  /**
   * Attach presigned image URL to a game entity.
   */
  private async resolveGameImage(game: GameEntity): Promise<GameEntity & { image?: string }> {
    if (game.imageKey) {
      const url = await this.storage.getPublicUrl(game.imageKey);
      return { ...game, image: url };
    }
    return game;
  }

  /**
   * Issue a presigned URL for uploading a game or stone image.
   * @param userId The user uploading the image.
   * @param dto The request body containing the content type.
   */
  async issueImageUploadUrl(
    userId: string,
    dto: CreateImageUploadUrlDto,
  ): Promise<{ uploadUrl: string; imageKey: string; expiresIn: number }> {
    const imageId = cuid();
    const imageKey = `stonemanage/images/${userId}/${imageId}`;

    const uploadUrl = await this.storage.getPresignedUploadUrl(
      imageKey,
      dto.contentType,
      UPLOAD_PRESIGNED_URL_EXPIRES_IN,
    );

    return { uploadUrl, imageKey, expiresIn: UPLOAD_PRESIGNED_URL_EXPIRES_IN };
  }

  /**
   * Creates a new game.
   * @param userId The ID of the user creating the game.
   * @param dto Data for the new game.
   * @returns The created game.
   */
  async createGame(userId: string, dto: CreateGameDto): Promise<GameEntity & { image?: string }> {
    const id = cuid();

    if (dto.imageKey) {
      const objectMeta = await this.storage.getObjectMetadata(dto.imageKey);
      if (!objectMeta) throw ErrorCodes.STONEMANAGE.GAME_NOT_FOUND;
    }

    const created = await this.gamesRepo.create(id, {
      userId,
      title: dto.title,
      imageKey: dto.imageKey,
    });
    return this.resolveGameImage(created);
  }

  /**
   * Retrieves games for a specific user with cursor-based pagination.
   * @param userId The user's ID.
   * @param query Pagination options.
   * @returns Paginated games.
   */
  async getGames(
    userId: string,
    query: BasePaginationQueryDto = { limit: 20 },
  ): Promise<PaginatedResult<GameEntity & { image?: string }>> {
    const { limit, cursor } = query;
    const { data, nextCursor, hasMore } = await this.gamesRepo.findByUserIdPaged(userId, { limit, cursor });
    const enriched = await Promise.all(data.map((g) => this.resolveGameImage(g)));
    return { data: enriched, total: null, page: null, limit, totalPages: null, nextCursor, hasMore };
  }

  /**
   * Retrieves a specific game by ID and ensures it belongs to the user.
   * @param id The game ID.
   * @param userId The user's ID.
   * @returns The game entity.
   */
  async getGame(id: string, userId: string): Promise<GameEntity & { image?: string }> {
    const game = await this.gamesRepo.getById(id);
    if (!game) {
      throw ErrorCodes.STONEMANAGE.GAME_NOT_FOUND;
    }
    if (game.userId !== userId) {
      throw ErrorCodes.STONEMANAGE.FORBIDDEN;
    }
    return this.resolveGameImage(game);
  }

  /**
   * Updates a specific game.
   * @param id The game ID.
   * @param userId The user's ID.
   * @param dto New game data.
   * @returns The updated game entity.
   */
  async updateGame(id: string, userId: string, dto: UpdateGameDto): Promise<GameEntity & { image?: string }> {
    const game = await this.gamesRepo.getById(id);
    if (!game) throw ErrorCodes.STONEMANAGE.GAME_NOT_FOUND;
    if (game.userId !== userId) throw ErrorCodes.STONEMANAGE.FORBIDDEN;

    if (dto.imageKey && dto.imageKey !== game.imageKey) {
      const objectMeta = await this.storage.getObjectMetadata(dto.imageKey);
      if (!objectMeta) throw ErrorCodes.STONEMANAGE.GAME_NOT_FOUND;
    }

    const updated = await this.gamesRepo.update(id, dto);

    if (game.imageKey && game.imageKey !== updated.imageKey) {
      await this.storage.deleteObject(game.imageKey);
    }

    return this.resolveGameImage(updated);
  }

  /**
   * Deletes a game and all its associated stones and logs.
   * @param id The game ID.
   * @param userId The user's ID.
   */
  async deleteGame(id: string, userId: string): Promise<void> {
    const game = await this.gamesRepo.getById(id);
    if (!game) throw ErrorCodes.STONEMANAGE.GAME_NOT_FOUND;
    if (game.userId !== userId) throw ErrorCodes.STONEMANAGE.FORBIDDEN;

    const stones = await this.stonesRepo.findByGameId(id);
    for (const st of stones) {
      await this.logsRepo.deleteByStoneId(st.id);
      if (st.imageKey) {
        await this.storage.deleteObject(st.imageKey);
      }
    }
    await this.stonesRepo.deleteByGameId(id);
    await this.gamesRepo.delete(id);

    if (game.imageKey) {
      await this.storage.deleteObject(game.imageKey);
    }
  }

  async deleteData(userId: string): Promise<void> {
    const games = await this.gamesRepo.findByUserId(userId);
    for (const game of games) {
      if (game.imageKey) {
        await this.storage.deleteObject(game.imageKey);
      }
    }
    await this.gamesRepo.deleteByUserId(userId);
  }
}
