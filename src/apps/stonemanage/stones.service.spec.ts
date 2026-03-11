import { describe, expect, it, beforeEach, vi, Mock } from 'vitest';
import { StonesService } from './stones.service.js';
import { GamesRepository } from './repositories/games.repository.js';
import { StonesRepository } from './repositories/stones.repository.js';
import { LogsRepository } from './repositories/logs.repository.js';
import { ErrorCodes } from '../../shared/errors/error.codes.js';
import type { IObjectStorage } from '../../storage/object-storage.interface.js';

describe('StonesService', () => {
  let service: StonesService;
  let gamesRepo: Record<string, Mock>;
  let stonesRepo: Record<string, Mock>;
  let logsRepo: Record<string, Mock>;
  let storage: Record<string, Mock>;

  beforeEach(() => {
    gamesRepo = {
      getById: vi.fn(),
    };

    stonesRepo = {
      create: vi.fn(),
      findByUserId: vi.fn(),
      findByGameId: vi.fn(),
      getById: vi.fn(),
      update: vi.fn(),
      deleteByGameId: vi.fn(),
    };

    logsRepo = {
      deleteByStoneId: vi.fn(),
    };

    storage = {
      getPresignedUrl: vi.fn().mockResolvedValue('https://example.com/signed-url'),
      getPresignedUploadUrl: vi.fn().mockResolvedValue('https://example.com/upload-url'),
      getObjectMetadata: vi.fn().mockResolvedValue({ contentType: 'image/png', size: 1024 }),
      deleteObject: vi.fn().mockResolvedValue(undefined),
    };

    service = new StonesService(
      gamesRepo as unknown as GamesRepository,
      stonesRepo as unknown as StonesRepository,
      logsRepo as unknown as LogsRepository,
      storage as unknown as IObjectStorage,
    );
  });

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

  it('creates a stone with imageKey and resolves image URL', async () => {
    gamesRepo.getById.mockResolvedValue({ id: 'g1', userId: 'u1' });
    stonesRepo.create.mockResolvedValue({ id: 's1', gameId: 'g1', userId: 'u1', name: 'Gems', amount: 100, imageKey: 'stonemanage/images/u1/img2' });
    const result = await service.createStone('g1', 'u1', { name: 'Gems', amount: 100, imageKey: 'stonemanage/images/u1/img2' });
    expect(result.image).toBe('https://example.com/signed-url');
  });

  it('creates a stone without imageKey', async () => {
    gamesRepo.getById.mockResolvedValue({ id: 'g1', userId: 'u1' });
    stonesRepo.create.mockResolvedValue({ id: 's1', gameId: 'g1', userId: 'u1', name: 'Gems', amount: 100 });
    const result = await service.createStone('g1', 'u1', { name: 'Gems', amount: 100 });
    expect(result.image).toBeUndefined();
  });

  it('rejects updating stone image for another user', async () => {
    stonesRepo.getById.mockResolvedValue({ id: 's1', gameId: 'g1', userId: 'u1' });
    await expect(
      service.updateStone('g1', 's1', 'u2', { imageKey: 'stonemanage/images/u2/img1' }),
    ).rejects.toThrow(ErrorCodes.STONEMANAGE.FORBIDDEN);
  });

  it('cleans up old image when stone image is replaced', async () => {
    stonesRepo.getById.mockResolvedValue({ id: 's1', gameId: 'g1', userId: 'u1', imageKey: 'old-key' });
    stonesRepo.update.mockResolvedValue({ id: 's1', gameId: 'g1', userId: 'u1', imageKey: 'new-key' });
    await service.updateStone('g1', 's1', 'u1', { imageKey: 'new-key' });
    expect(storage.deleteObject).toHaveBeenCalledWith('old-key');
  });
});
