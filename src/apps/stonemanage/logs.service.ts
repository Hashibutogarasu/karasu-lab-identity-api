import { Injectable } from '@nestjs/common';
import cuid from 'cuid';

import { StonesRepository } from './repositories/stones.repository.js';
import { LogsRepository } from './repositories/logs.repository.js';
import { ErrorCodes } from '../../shared/errors/error.codes.js';
import { Deletable } from '../../shared/deletable/deletable.decorator.js';
import type { IDeletable } from '../../shared/deletable/deletable.interface.js';
import { CreateLogDto } from './dto/create-log.dto.js';
import { UpdateLogDto } from './dto/update-log.dto.js';
import { LogEntity } from './entities/log.entity.js';
import type { PaginatedResult } from '../../shared/types/pagination.types.js';
import { BasePaginationQueryDto } from '../../shared/dto/pagination-query.dto.js';

/**
 * Service for managing stone logs.
 */
@Deletable(1)
@Injectable()
export class LogsService implements IDeletable {
  constructor(
    private readonly stonesRepo: StonesRepository,
    private readonly logsRepo: LogsRepository,
  ) {}

  /**
   * Validate stone ownership.
   * @param stoneId The stone ID.
   * @param userId The user ID.
   */
  private async validateStoneOwnership(stoneId: string, userId: string): Promise<void> {
    const stone = await this.stonesRepo.getById(stoneId);
    if (!stone) {
      throw ErrorCodes.STONEMANAGE.STONE_NOT_FOUND;
    }
    if (stone.userId !== userId) {
      throw ErrorCodes.STONEMANAGE.FORBIDDEN;
    }
  }

  /**
   * Find the latest log for a stone, sorted by createdAt descending.
   * @param stoneId The stone ID.
   */
  private async findLatestLog(stoneId: string): Promise<LogEntity | null> {
    const logs = await this.logsRepo.findByStoneId(stoneId);
    if (logs.length === 0) return null;
    logs.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return logs[0];
  }

  /**
   * Retrieves logs for a specific stone with cursor-based pagination.
   * @param stoneId The stone ID.
   * @param userId The user's ID.
   * @param query Pagination options.
   * @returns Paginated logs.
   */
  async getLogs(
    stoneId: string,
    userId: string,
    query: BasePaginationQueryDto = { limit: 20 },
  ): Promise<PaginatedResult<LogEntity>> {
    await this.validateStoneOwnership(stoneId, userId);
    const { limit, cursor } = query;
    const { data, nextCursor, hasMore } = await this.logsRepo.findByStoneIdPaged(stoneId, { limit, cursor });
    return { data, total: null, page: null, limit, totalPages: null, nextCursor, hasMore };
  }

  /**
   * Retrieves a specific log by ID, assuring ownership via the stone.
   * @param stoneId The stone ID.
   * @param logId The log ID.
   * @param userId The user ID.
   * @returns The log entity.
   */
  async getLog(stoneId: string, logId: string, userId: string): Promise<LogEntity> {
    await this.validateStoneOwnership(stoneId, userId);

    const log = await this.logsRepo.getById(logId);
    if (!log) {
      throw ErrorCodes.STONEMANAGE.LOG_NOT_FOUND;
    }
    if (log.stoneId !== stoneId) {
      throw ErrorCodes.STONEMANAGE.LOG_NOT_FOUND;
    }
    return log;
  }

  /**
   * Creates a new log for a stone, tracking currency deltas.
   * @param stoneId The stone ID.
   * @param userId The user ID.
   * @param dto The create dto containing the amount.
   * @returns The created log entity.
   */
  async createLog(stoneId: string, userId: string, dto: CreateLogDto): Promise<LogEntity> {
    await this.validateStoneOwnership(stoneId, userId);

    const latestLog = await this.findLatestLog(stoneId);

    const id = cuid();
    const created = await this.logsRepo.create(id, {
      userId,
      stoneId,
      amount: dto.amount,
      previousAmount: latestLog ? latestLog.amount : undefined,
      nextAmount: undefined,
    });

    if (latestLog) {
      await this.logsRepo.update(latestLog.id, { nextAmount: dto.amount });
    }

    return created;
  }

  /**
   * Updates an existing log and recalculates adjacent currency deltas.
   * @param stoneId The stone ID.
   * @param logId The log ID.
   * @param userId The user ID.
   * @param dto The update dto.
   * @returns The updated log entity.
   */
  async updateLog(
    stoneId: string,
    logId: string,
    userId: string,
    dto: UpdateLogDto,
  ): Promise<LogEntity> {
    const currentLog = await this.getLog(stoneId, logId, userId);

    const updatedLog = await this.logsRepo.update(logId, {
      amount: dto.amount,
    });

    if (dto.amount !== undefined && dto.amount !== currentLog.amount) {
      const allLogs = await this.logsRepo.findByStoneId(stoneId);
      allLogs.sort((a, b) => a.createdAt.localeCompare(b.createdAt));

      const idx = allLogs.findIndex((l) => l.id === logId);

      if (idx > 0) {
        await this.logsRepo.update(allLogs[idx - 1].id, { nextAmount: dto.amount });
      }

      if (idx < allLogs.length - 1) {
        await this.logsRepo.update(logId, { previousAmount: updatedLog.previousAmount });
        await this.logsRepo.update(allLogs[idx + 1].id, { previousAmount: dto.amount });
      }
    }

    return updatedLog;
  }

  /**
   * Deletes a log.
   * @param stoneId The stone ID.
   * @param logId The log ID.
   * @param userId The user ID.
   */
  async deleteLog(stoneId: string, logId: string, userId: string): Promise<void> {
    await this.getLog(stoneId, logId, userId);
    await this.logsRepo.delete(logId);
  }

  async deleteData(userId: string): Promise<void> {
    const stones = await this.stonesRepo.findByUserId(userId);
    for (const stone of stones) {
      await this.logsRepo.deleteByStoneId(stone.id);
    }
  }
}
