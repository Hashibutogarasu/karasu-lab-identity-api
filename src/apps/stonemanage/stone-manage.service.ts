import { Injectable } from '@nestjs/common';
import cuid from 'cuid';

import { GamesRepository } from './repositories/games.repository.js';
import { StonesRepository } from './repositories/stones.repository.js';
import { ErrorCodes } from '../../shared/errors/error.codes.js';
import { CreateGameDto } from './dto/create-game.dto.js';
import { UpdateGameDto } from './dto/update-game.dto.js';
import { CreateStoneDto } from './dto/create-stone.dto.js';
import { UpdateStoneDto } from './dto/update-stone.dto.js';
import { CreateLogDto } from './dto/create-log.dto.js';
import { UpdateLogDto } from './dto/update-log.dto.js';
import { GameEntity } from './entities/game.entity.js';
import { StoneEntity } from './entities/stone.entity.js';
import { LogEntity } from './entities/log.entity.js';
import { LogsRepository } from './repositories/logs.repository.js';

/**
 * Service to manage games and stones logic.
 */
@Injectable()
export class StoneManageService {
  constructor(
    private readonly gamesRepo: GamesRepository,
    private readonly stonesRepo: StonesRepository,
    private readonly logsRepo: LogsRepository,
  ) {}

  /**
   * Creates a new game.
   * @param userId The ID of the user creating the game.
   * @param dto Data for the new game.
   * @returns The created game.
   */
  async createGame(userId: string, dto: CreateGameDto): Promise<GameEntity> {
    const id = cuid();
    return this.gamesRepo.create(id, {
      userId,
      title: dto.title,
    });
  }

  /**
   * Retrieves all games for a specific user.
   * @param userId The user's ID.
   * @returns Array of games.
   */
  async getGames(userId: string): Promise<GameEntity[]> {
    return this.gamesRepo.findByUserId(userId);
  }

  /**
   * Retrieves a specific game by ID and ensures it belongs to the user.
   * @param id The game ID.
   * @param userId The user's ID.
   * @returns The game entity.
   */
  async getGame(id: string, userId: string): Promise<GameEntity> {
    const game = await this.gamesRepo.getById(id);
    if (!game) {
      throw ErrorCodes.STONEMANAGE.GAME_NOT_FOUND;
    }
    if (game.userId !== userId) {
      throw ErrorCodes.STONEMANAGE.FORBIDDEN;
    }
    return game;
  }

  /**
   * Updates a specific game.
   * @param id The game ID.
   * @param userId The user's ID.
   * @param dto New game data.
   * @returns The updated game entity.
   */
  async updateGame(id: string, userId: string, dto: UpdateGameDto): Promise<GameEntity> {
    await this.getGame(id, userId); // Ensure game exists and belongs to user
    return this.gamesRepo.update(id, dto);
  }

  /**
   * Deletes a game and all its associated stones.
   * @param id The game ID.
   * @param userId The user's ID.
   */
  async deleteGame(id: string, userId: string): Promise<void> {
    await this.getGame(id, userId); // Ensure game exists and belongs to user
    const stones = await this.stonesRepo.findByGameId(id);
    for (const st of stones) {
      await this.logsRepo.deleteByStoneId(st.id);
    }
    await this.stonesRepo.deleteByGameId(id);
    await this.gamesRepo.delete(id);
  }

  /**
   * Retrieves all stones for a specific user.
   * @param userId The user's ID.
   * @returns Array of stones.
   */
  async getStones(userId: string): Promise<StoneEntity[]> {
    return this.stonesRepo.findByUserId(userId);
  }

  /**
   * Retrieves a specific stone ensuring it belongs to the game and user.
   * @param gameId The game ID.
   * @param stoneId The stone ID.
   * @param userId The user's ID.
   * @returns The stone entity.
   */
  async getStone(gameId: string, stoneId: string, userId: string): Promise<StoneEntity> {
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
    return stone;
  }

  /**
   * Creates a new stone in a specific game.
   * @param gameId The game ID.
   * @param userId The user ID.
   * @param dto Data for the new stone.
   * @returns The created stone entity.
   */
  async createStone(gameId: string, userId: string, dto: CreateStoneDto): Promise<StoneEntity> {
    await this.getGame(gameId, userId); // Make sure game exists and user owns it.
    
    const id = cuid();
    return this.stonesRepo.create(id, {
      userId,
      gameId,
      name: dto.name,
      amount: dto.amount,
    });
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
  ): Promise<StoneEntity> {
    await this.getStone(gameId, stoneId, userId); // Ensures existence & ownership
    return this.stonesRepo.update(stoneId, dto);
  }

  /**
   * Deletes all stones under a specific game.
   * @param gameId The game ID.
   * @param userId The user ID.
   */
  async deleteStonesByGame(gameId: string, userId: string): Promise<void> {
    await this.getGame(gameId, userId); // Ensures existence & ownership
    const stones = await this.stonesRepo.findByGameId(gameId);
    for (const st of stones) {
      await this.logsRepo.deleteByStoneId(st.id);
    }
    await this.stonesRepo.deleteByGameId(gameId);
  }

  /**
   * Retrieves all logs for a specific stone.
   * @param stoneId The stone ID.
   * @param userId The user's ID.
   * @returns Array of logs.
   */
  async getLogs(stoneId: string, userId: string): Promise<LogEntity[]> {
    const stone = await this.stonesRepo.getById(stoneId);
    if (!stone) {
      throw ErrorCodes.STONEMANAGE.STONE_NOT_FOUND;
    }
    if (stone.userId !== userId) {
      throw ErrorCodes.STONEMANAGE.FORBIDDEN;
    }
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
    const stone = await this.stonesRepo.getById(stoneId);
    if (!stone) {
      throw ErrorCodes.STONEMANAGE.STONE_NOT_FOUND;
    }
    if (stone.userId !== userId) {
      throw ErrorCodes.STONEMANAGE.FORBIDDEN;
    }

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
    const stone = await this.stonesRepo.getById(stoneId);
    if (!stone) {
      throw ErrorCodes.STONEMANAGE.STONE_NOT_FOUND;
    }
    if (stone.userId !== userId) {
      throw ErrorCodes.STONEMANAGE.FORBIDDEN;
    }

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
    await this.getLog(stoneId, logId, userId); // Ensures existence and ownership
    return this.logsRepo.update(logId, dto);
  }

  /**
   * Deletes a log.
   * @param stoneId The stone ID.
   * @param logId The log ID.
   * @param userId The user ID.
   */
  async deleteLog(stoneId: string, logId: string, userId: string): Promise<void> {
    await this.getLog(stoneId, logId, userId); // Ensures existence and ownership
    await this.logsRepo.delete(logId);
  }
}
