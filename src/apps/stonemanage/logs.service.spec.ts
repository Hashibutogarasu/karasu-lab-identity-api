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
    logsRepo.findByStoneId.mockResolvedValue([]);
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
    logsRepo.findByStoneId.mockResolvedValue([
      { id: 'l1', stoneId: 's1', userId: 'u1', amount: 50, createdAt: '2026-01-01T00:00:00Z' },
    ]);

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

  it('sets previousAmount to undefined on first log creation', async () => {
    stonesRepo.getById.mockResolvedValue({ id: 's1', gameId: 'g1', userId: 'u1' });
    logsRepo.findByStoneId.mockResolvedValue([]);
    logsRepo.create.mockImplementation((_id: string, data: Record<string, unknown>) => Promise.resolve({ id: _id, ...data }));

    const result = await service.createLog('s1', 'u1', { amount: 100 });
    expect(result.previousAmount).toBeUndefined();
    expect(result.nextAmount).toBeUndefined();
  });

  it('sets previousAmount from latest log and updates latest log nextAmount', async () => {
    stonesRepo.getById.mockResolvedValue({ id: 's1', gameId: 'g1', userId: 'u1' });
    logsRepo.findByStoneId.mockResolvedValue([
      { id: 'l1', stoneId: 's1', userId: 'u1', amount: 100, createdAt: '2026-01-01T00:00:00Z' },
    ]);
    logsRepo.create.mockImplementation((_id: string, data: Record<string, unknown>) => Promise.resolve({ id: _id, ...data }));
    logsRepo.update.mockResolvedValue({});

    const result = await service.createLog('s1', 'u1', { amount: 150 });
    expect(result.previousAmount).toBe(100);
    expect(result.nextAmount).toBeUndefined();
    expect(logsRepo.update).toHaveBeenCalledWith('l1', { nextAmount: 150 });
  });

  it('tracks deltas correctly across 3 logs with different amounts', async () => {
    stonesRepo.getById.mockResolvedValue({ id: 's1', gameId: 'g1', userId: 'u1' });

    logsRepo.findByStoneId.mockResolvedValue([]);
    logsRepo.create.mockImplementation((_id: string, data: Record<string, unknown>) => Promise.resolve({ id: _id, ...data }));
    logsRepo.update.mockResolvedValue({});

    const log1 = await service.createLog('s1', 'u1', { amount: 100 });
    expect(log1.previousAmount).toBeUndefined();

    logsRepo.findByStoneId.mockResolvedValue([
      { id: log1.id, stoneId: 's1', userId: 'u1', amount: 100, createdAt: '2026-01-01T00:00:00Z' },
    ]);
    const log2 = await service.createLog('s1', 'u1', { amount: 150 });
    expect(log2.previousAmount).toBe(100);
    expect(logsRepo.update).toHaveBeenCalledWith(log1.id, { nextAmount: 150 });

    logsRepo.findByStoneId.mockResolvedValue([
      { id: log1.id, stoneId: 's1', userId: 'u1', amount: 100, createdAt: '2026-01-01T00:00:00Z', nextAmount: 150 },
      { id: log2.id, stoneId: 's1', userId: 'u1', amount: 150, createdAt: '2026-01-02T00:00:00Z', previousAmount: 100 },
    ]);
    const log3 = await service.createLog('s1', 'u1', { amount: 80 });
    expect(log3.previousAmount).toBe(150);
    expect(log3.nextAmount).toBeUndefined();
    expect(logsRepo.update).toHaveBeenCalledWith(log2.id, { nextAmount: 80 });
  });

  it('does not modify existing amount when updating previousAmount/nextAmount', async () => {
    stonesRepo.getById.mockResolvedValue({ id: 's1', gameId: 'g1', userId: 'u1' });
    logsRepo.getById.mockResolvedValue({
      id: 'l2', stoneId: 's1', userId: 'u1', amount: 150,
      previousAmount: 100, nextAmount: undefined,
      createdAt: '2026-01-02T00:00:00Z',
    });
    logsRepo.update.mockImplementation((_id: string, data: Record<string, unknown>) =>
      Promise.resolve({ id: _id, stoneId: 's1', userId: 'u1', amount: data.amount ?? 150, ...data }),
    );
    logsRepo.findByStoneId.mockResolvedValue([
      { id: 'l1', stoneId: 's1', userId: 'u1', amount: 100, createdAt: '2026-01-01T00:00:00Z', nextAmount: 150 },
      { id: 'l2', stoneId: 's1', userId: 'u1', amount: 150, createdAt: '2026-01-02T00:00:00Z', previousAmount: 100 },
    ]);

    await service.updateLog('s1', 'l2', 'u1', { amount: 200 });

    const firstUpdateCall = logsRepo.update.mock.calls[0];
    expect(firstUpdateCall[0]).toBe('l2');
    expect(firstUpdateCall[1]).toEqual({ amount: 200 });

    const prevLogUpdate = logsRepo.update.mock.calls.find(
      (call: unknown[]) => call[0] === 'l1',
    );
    expect(prevLogUpdate).toBeDefined();
    expect(prevLogUpdate[1]).toEqual({ nextAmount: 200 });
  });
});
