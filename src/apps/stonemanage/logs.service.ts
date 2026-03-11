import { Injectable } from '@nestjs/common';
import cuid from 'cuid';

import { StonesRepository } from './repositories/stones.repository.js';
import { LogsRepository } from './repositories/logs.repository.js';
import { ErrorCodes } from '../../shared/errors/error.codes.js';
import { CreateLogDto } from './dto/create-log.dto.js';
import { UpdateLogDto } from './dto/update-log.dto.js';
import { LogEntity } from './entities/log.entity.js';

/**
 * Service for managing stone logs.
 */
@Injectable()
export class LogsService {
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
   * Retrieves all logs for a specific stone.
   * @param stoneId The stone ID.
   * @param userId The user's ID.
   * @returns Array of logs.
   */
  async getLogs(stoneId: string, userId: string): Promise<LogEntity[]> {
    await this.validateStoneOwnership(stoneId, userId);
    return this.logsRepo.findByStoneId(stoneId);
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
   * Creates a new log for a stone.
   * @param stoneId The stone ID.
   * @param userId The user ID.
   * @param dto The create dto containing the amount.
   * @returns The created log entity.
   */
  async createLog(stoneId: string, userId: string, dto: CreateLogDto): Promise<LogEntity> {
    await this.validateStoneOwnership(stoneId, userId);

    const id = cuid();
    return this.logsRepo.create(id, {
      userId,
      stoneId,
      amount: dto.amount,
    });
  }

  /**
   * Updates an existing log.
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
    await this.getLog(stoneId, logId, userId);
    return this.logsRepo.update(logId, dto);
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
}
