import { Inject, Injectable } from '@nestjs/common';
import cuid from 'cuid';

import { GamesRepository } from './repositories/games.repository.js';
import { StonesRepository } from './repositories/stones.repository.js';
import { LogsRepository } from './repositories/logs.repository.js';
import { ErrorCodes } from '../../shared/errors/error.codes.js';
import { Deletable } from '../../shared/deletable/deletable.decorator.js';
import type { IDeletable } from '../../shared/deletable/deletable.interface.js';
import { CreateStoneDto } from './dto/create-stone.dto.js';
import { UpdateStoneDto } from './dto/update-stone.dto.js';
import { StoneEntity } from './entities/stone.entity.js';
import { IObjectStorageService } from '../../storage/object-storage.interface.js';
import type { IObjectStorage } from '../../storage/object-storage.interface.js';
import type { PaginatedResult } from '../../shared/types/pagination.types.js';
import { BasePaginationQueryDto } from '../../shared/dto/pagination-query.dto.js';

/**
 * Service for managing stones (in-game currencies).
 */
@Deletable(3)
@Injectable()
export class StonesService implements IDeletable {
  constructor(
    private readonly gamesRepo: GamesRepository,
    private readonly stonesRepo: StonesRepository,
    private readonly logsRepo: LogsRepository,
    @Inject(IObjectStorageService) private readonly storage: IObjectStorage,
  ) {}

  /**
   * Attach presigned image URL to a stone entity.
   */
  private async resolveStoneImage(stone: StoneEntity): Promise<StoneEntity & { image?: string }> {
    if (stone.imageKey) {
      const url = await this.storage.getPublicUrl(stone.imageKey);
      return { ...stone, image: url };
    }
    return stone;
  }

  /**
   * Validate game ownership.
   * @param gameId The game ID.
   * @param userId The user ID.
   */
  private async validateGameOwnership(gameId: string, userId: string): Promise<void> {
    const game = await this.gamesRepo.getById(gameId);
    if (!game) {
      throw ErrorCodes.STONEMANAGE.GAME_NOT_FOUND;
    }
    if (game.userId !== userId) {
      throw ErrorCodes.STONEMANAGE.FORBIDDEN;
    }
  }

  /**
   * Retrieves stones for a specific user with cursor-based pagination.
   * @param userId The user's ID.
   * @param query Pagination options.
   * @returns Paginated stones.
   */
  async getStones(
    userId: string,
    query: BasePaginationQueryDto = { limit: 20 },
  ): Promise<PaginatedResult<StoneEntity & { image?: string }>> {
    const { limit, cursor } = query;
    const { data, nextCursor, hasMore } = await this.stonesRepo.findByUserIdPaged(userId, { limit, cursor });
    const enriched = await Promise.all(data.map((s) => this.resolveStoneImage(s)));
    return { data: enriched, total: null, page: null, limit, totalPages: null, nextCursor, hasMore };
  }

  /**
   * Retrieves a specific stone ensuring it belongs to the game and user.
   * @param gameId The game ID.
   * @param stoneId The stone ID.
   * @param userId The user's ID.
   * @returns The stone entity.
   */
  async getStone(gameId: string, stoneId: string, userId: string): Promise<StoneEntity & { image?: string }> {
    const stone = await this.stonesRepo.getById(stoneId);
    if (!stone) {
      throw ErrorCodes.STONEMANAGE.STONE_NOT_FOUND;
    }
    if (stone.userId !== userId) {
      throw ErrorCodes.STONEMANAGE.FORBIDDEN;
    }
    if (stone.gameId !== gameId) {
      throw ErrorCodes.STONEMANAGE.STONE_NOT_FOUND;
    }
    return this.resolveStoneImage(stone);
  }

  /**
   * Creates a new stone in a specific game.
   * @param gameId The game ID.
   * @param userId The user ID.
   * @param dto Data for the new stone.
   * @returns The created stone entity.
   */
  async createStone(gameId: string, userId: string, dto: CreateStoneDto): Promise<StoneEntity & { image?: string }> {
    await this.validateGameOwnership(gameId, userId);

    if (dto.imageKey) {
      const objectMeta = await this.storage.getObjectMetadata(dto.imageKey);
      if (!objectMeta) throw ErrorCodes.STONEMANAGE.STONE_NOT_FOUND;
    }

    const id = cuid();
    const created = await this.stonesRepo.create(id, {
      userId,
      gameId,
      name: dto.name,
      amount: dto.amount,
      imageKey: dto.imageKey,
    });
    return this.resolveStoneImage(created);
  }

  /**
   * Updates a stone's metadata.
   * @param gameId The game ID.
   * @param stoneId The stone ID.
   * @param userId The user ID.
   * @param dto Update data.
   * @returns The updated stone entity.
   */
  async updateStone(
    gameId: string,
    stoneId: string,
    userId: string,
    dto: UpdateStoneDto,
  ): Promise<StoneEntity & { image?: string }> {
    const stone = await this.getStone(gameId, stoneId, userId);

    if (dto.imageKey && dto.imageKey !== stone.imageKey) {
      const objectMeta = await this.storage.getObjectMetadata(dto.imageKey);
      if (!objectMeta) throw ErrorCodes.STONEMANAGE.STONE_NOT_FOUND;
    }

    const updated = await this.stonesRepo.update(stoneId, dto);

    if (stone.imageKey && stone.imageKey !== updated.imageKey) {
      await this.storage.deleteObject(stone.imageKey);
    }

    return this.resolveStoneImage(updated);
  }

  /**
   * Deletes all stones under a specific game.
   * @param gameId The game ID.
   * @param userId The user ID.
   */
  async deleteStonesByGame(gameId: string, userId: string): Promise<void> {
    await this.validateGameOwnership(gameId, userId);
    const stones = await this.stonesRepo.findByGameId(gameId);
    for (const st of stones) {
      await this.logsRepo.deleteByStoneId(st.id);
    }
    await this.stonesRepo.deleteByGameId(gameId);
  }

  async deleteData(userId: string): Promise<void> {
    const stones = await this.stonesRepo.findByUserId(userId);
    for (const stone of stones) {
      if (stone.imageKey) {
        await this.storage.deleteObject(stone.imageKey);
      }
    }
    await this.stonesRepo.deleteByUserId(userId);
  }
}
