import { describe, expect, it, beforeEach, vi, Mock } from 'vitest';
import { StoneManageService } from './stone-manage.service.js';
import { GamesRepository } from './repositories/games.repository.js';
import { StonesRepository } from './repositories/stones.repository.js';
import { LogsRepository } from './repositories/logs.repository.js';
import { ErrorCodes } from '../../shared/errors/error.codes.js';

describe('StoneManageService', () => {
  let service: StoneManageService;
  let gamesRepo: Record<keyof GamesRepository, Mock>;
  let stonesRepo: Record<keyof StonesRepository, Mock>;
  let logsRepo: Record<keyof LogsRepository, Mock>;

  beforeEach(() => {
    gamesRepo = {
      create: vi.fn(),
      findByUserId: vi.fn(),
      getById: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    } as unknown as Record<keyof GamesRepository, Mock>;

    stonesRepo = {
      create: vi.fn(),
      findByUserId: vi.fn(),
      findByGameId: vi.fn(),
      getById: vi.fn(),
      update: vi.fn(),
      deleteByGameId: vi.fn(),
    } as unknown as Record<keyof StonesRepository, Mock>;

    logsRepo = {
      create: vi.fn(),
      findByStoneId: vi.fn(),
      getById: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      deleteByStoneId: vi.fn(),
    } as unknown as Record<keyof LogsRepository, Mock>;

    service = new StoneManageService(
      gamesRepo as unknown as GamesRepository,
      stonesRepo as unknown as StonesRepository,
      logsRepo as unknown as LogsRepository,
    );
  });

  describe('Games', () => {
    it('creates a game for a user', async () => {
      const dto = { title: 'My Game' };
      gamesRepo.create.mockResolvedValue({ id: 'g1', userId: 'u1', title: 'My Game' });
      const result = await service.createGame('u1', dto);
      expect(result.userId).toBe('u1');
      expect(gamesRepo.create).toHaveBeenCalled();
    });

    it('gets a game only if the user owns it', async () => {
      gamesRepo.getById.mockResolvedValue({ id: 'g1', userId: 'u1' });
      const result = await service.getGame('g1', 'u1');
      expect(result).toBeDefined();

      await expect(service.getGame('g1', 'u2')).rejects.toThrow(ErrorCodes.STONEMANAGE.FORBIDDEN);
    });

    it('updates a game only if the user owns it', async () => {
      gamesRepo.getById.mockResolvedValue({ id: 'g1', userId: 'u1' });
      gamesRepo.update.mockResolvedValue({ id: 'g1', userId: 'u1', title: 'Updated' });

      await service.updateGame('g1', 'u1', { title: 'Updated' });
      expect(gamesRepo.update).toHaveBeenCalled();

      await expect(service.updateGame('g1', 'u2', { title: 'Updated' })).rejects.toThrow(ErrorCodes.STONEMANAGE.FORBIDDEN);
    });

    it('deletes a game and stones only if the user owns it', async () => {
      gamesRepo.getById.mockResolvedValue({ id: 'g1', userId: 'u1' });
      stonesRepo.findByGameId.mockResolvedValue([{ id: 's1' }]);
      
      await service.deleteGame('g1', 'u1');
      expect(logsRepo.deleteByStoneId).toHaveBeenCalledWith('s1');
      expect(stonesRepo.deleteByGameId).toHaveBeenCalledWith('g1');
      expect(gamesRepo.delete).toHaveBeenCalledWith('g1');

      await expect(service.deleteGame('g1', 'u2')).rejects.toThrow(ErrorCodes.STONEMANAGE.FORBIDDEN);
    });
  });

  describe('Stones', () => {
    it('creates a stone requiring a valid game ID', async () => {
      gamesRepo.getById.mockResolvedValue({ id: 'g1', userId: 'u1' });
      stonesRepo.create.mockResolvedValue({ id: 's1', gameId: 'g1', userId: 'u1' });

      const dto = { name: 'Gems', amount: 100 };
      const result = await service.createStone('g1', 'u1', dto);
      expect(result).toBeDefined();

      gamesRepo.getById.mockResolvedValue({ id: 'g1', userId: 'u2' });
      await expect(service.createStone('g1', 'u1', dto)).rejects.toThrow(ErrorCodes.STONEMANAGE.FORBIDDEN);
    });

    it('gets a stone only if the user owns it and it matches game ID', async () => {
      stonesRepo.getById.mockResolvedValue({ id: 's1', gameId: 'g1', userId: 'u1' });

      const result = await service.getStone('g1', 's1', 'u1');
      expect(result).toBeDefined();

      await expect(service.getStone('g1', 's1', 'u2')).rejects.toThrow(ErrorCodes.STONEMANAGE.FORBIDDEN);

      await expect(service.getStone('g2', 's1', 'u1')).rejects.toThrow(ErrorCodes.STONEMANAGE.STONE_NOT_FOUND);
    });

    it('updates a stone only if owned', async () => {
      stonesRepo.getById.mockResolvedValue({ id: 's1', gameId: 'g1', userId: 'u1' });
      stonesRepo.update.mockResolvedValue({ id: 's1', gameId: 'g1', userId: 'u1', amount: 50 });

      await service.updateStone('g1', 's1', 'u1', { amount: 50 });
      expect(stonesRepo.update).toHaveBeenCalled();

      await expect(service.updateStone('g1', 's1', 'u2', { amount: 50 })).rejects.toThrow(ErrorCodes.STONEMANAGE.FORBIDDEN);
    });

    it('deletes stones in a game only if the user owns the game', async () => {
      gamesRepo.getById.mockResolvedValue({ id: 'g1', userId: 'u1' });
      stonesRepo.findByGameId.mockResolvedValue([{ id: 's1' }]);
      
      await service.deleteStonesByGame('g1', 'u1');
      expect(logsRepo.deleteByStoneId).toHaveBeenCalledWith('s1');
      expect(stonesRepo.deleteByGameId).toHaveBeenCalledWith('g1');

      await expect(service.deleteStonesByGame('g1', 'u2')).rejects.toThrow(ErrorCodes.STONEMANAGE.FORBIDDEN);
    });
  });

  describe('Logs', () => {
    it('creates a log requiring a valid stone and ownership', async () => {
      stonesRepo.getById.mockResolvedValue({ id: 's1', gameId: 'g1', userId: 'u1' });
      logsRepo.create.mockResolvedValue({ id: 'l1', stoneId: 's1', userId: 'u1', amount: 50 });

      const dto = { amount: 50 };
      const result = await service.createLog('s1', 'u1', dto);
      expect(result).toBeDefined();

      stonesRepo.getById.mockResolvedValue({ id: 's1', gameId: 'g1', userId: 'u2' });
      await expect(service.createLog('s1', 'u1', dto)).rejects.toThrow(ErrorCodes.STONEMANAGE.FORBIDDEN);
      
      stonesRepo.getById.mockResolvedValue(null);
      await expect(service.createLog('invalid', 'u1', dto)).rejects.toThrow(ErrorCodes.STONEMANAGE.STONE_NOT_FOUND);
    });

    it('gets a log only if the user owns the stone and log belongs to it', async () => {
      stonesRepo.getById.mockResolvedValue({ id: 's1', gameId: 'g1', userId: 'u1' });
      logsRepo.getById.mockResolvedValue({ id: 'l1', stoneId: 's1', userId: 'u1', amount: 50 });

      const result = await service.getLog('s1', 'l1', 'u1');
      expect(result).toBeDefined();

      logsRepo.getById.mockResolvedValue(null);
      await expect(service.getLog('s1', 'l2', 'u1')).rejects.toThrow(ErrorCodes.STONEMANAGE.LOG_NOT_FOUND);

      logsRepo.getById.mockResolvedValue({ id: 'l1', stoneId: 's2', userId: 'u1', amount: 50 });
      await expect(service.getLog('s1', 'l1', 'u1')).rejects.toThrow(ErrorCodes.STONEMANAGE.LOG_NOT_FOUND);
    });

    it('updates a log only if owned', async () => {
      stonesRepo.getById.mockResolvedValue({ id: 's1', gameId: 'g1', userId: 'u1' });
      logsRepo.getById.mockResolvedValue({ id: 'l1', stoneId: 's1', userId: 'u1', amount: 50 });
      logsRepo.update.mockResolvedValue({ id: 'l1', stoneId: 's1', userId: 'u1', amount: 100 });

      await service.updateLog('s1', 'l1', 'u1', { amount: 100 });
      expect(logsRepo.update).toHaveBeenCalled();
      
      stonesRepo.getById.mockResolvedValue({ id: 's1', gameId: 'g1', userId: 'u1' });
      await expect(service.updateLog('s1', 'l1', 'u2', { amount: 100 })).rejects.toThrow(ErrorCodes.STONEMANAGE.FORBIDDEN);
    });

    it('deletes a log only if owned', async () => {
      stonesRepo.getById.mockResolvedValue({ id: 's1', gameId: 'g1', userId: 'u1' });
      logsRepo.getById.mockResolvedValue({ id: 'l1', stoneId: 's1', userId: 'u1', amount: 50 });

      await service.deleteLog('s1', 'l1', 'u1');
      expect(logsRepo.delete).toHaveBeenCalledWith('l1');
    });
  });
});
