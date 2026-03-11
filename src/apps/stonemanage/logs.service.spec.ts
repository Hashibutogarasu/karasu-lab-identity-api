import { describe, expect, it, beforeEach, vi, Mock } from 'vitest';
import { LogsService } from './logs.service.js';
import { StonesRepository } from './repositories/stones.repository.js';
import { LogsRepository } from './repositories/logs.repository.js';
import { ErrorCodes } from '../../shared/errors/error.codes.js';

describe('LogsService', () => {
  let service: LogsService;
  let stonesRepo: Record<string, Mock>;
  let logsRepo: Record<string, Mock>;

  beforeEach(() => {
    stonesRepo = {
      getById: vi.fn(),
    };

    logsRepo = {
      create: vi.fn(),
      findByStoneId: vi.fn(),
      getById: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      deleteByStoneId: vi.fn(),
    };

    service = new LogsService(
      stonesRepo as unknown as StonesRepository,
      logsRepo as unknown as LogsRepository,
    );
  });

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
