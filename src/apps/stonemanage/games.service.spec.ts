import { describe, expect, it, beforeEach, vi, Mock } from 'vitest';
import { GamesService } from './games.service.js';
import { GamesRepository } from './repositories/games.repository.js';
import { StonesRepository } from './repositories/stones.repository.js';
import { LogsRepository } from './repositories/logs.repository.js';
import { ErrorCodes } from '../../shared/errors/error.codes.js';
import type { IObjectStorage } from '../../storage/object-storage.interface.js';

describe('GamesService', () => {
  let service: GamesService;
  let gamesRepo: Record<string, Mock>;
  let stonesRepo: Record<string, Mock>;
  let logsRepo: Record<string, Mock>;
  let storage: Record<string, Mock>;

  beforeEach(() => {
    gamesRepo = {
      create: vi.fn(),
      findByUserId: vi.fn(),
      getById: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
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
      create: vi.fn(),
      findByStoneId: vi.fn(),
      getById: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      deleteByStoneId: vi.fn(),
    };

    storage = {
      getPresignedUrl: vi.fn().mockResolvedValue('https://example.com/signed-url'),
      getPresignedUploadUrl: vi.fn().mockResolvedValue('https://example.com/upload-url'),
      getObjectMetadata: vi.fn().mockResolvedValue({ contentType: 'image/png', size: 1024 }),
      putObject: vi.fn().mockResolvedValue(undefined),
      getContentType: vi.fn().mockResolvedValue('image/png'),
      getObject: vi.fn().mockResolvedValue(null),
      deleteObject: vi.fn().mockResolvedValue(undefined),
      listObjects: vi.fn().mockResolvedValue([]),
    };

    service = new GamesService(
      gamesRepo as unknown as GamesRepository,
      stonesRepo as unknown as StonesRepository,
      logsRepo as unknown as LogsRepository,
      storage as unknown as IObjectStorage,
    );
  });

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

  it('issues a presigned upload URL', async () => {
    const dto = { contentType: 'image/png' as const };
    const result = await service.issueImageUploadUrl('u1', dto);
    expect(result.uploadUrl).toBe('https://example.com/upload-url');
    expect(result.imageKey).toContain('stonemanage/images/u1/');
    expect(result.expiresIn).toBe(900);
  });

  it('creates a game with imageKey and resolves image URL', async () => {
    gamesRepo.create.mockResolvedValue({ id: 'g1', userId: 'u1', title: 'My Game', imageKey: 'stonemanage/images/u1/img1' });
    const result = await service.createGame('u1', { title: 'My Game', imageKey: 'stonemanage/images/u1/img1' });
    expect(result.image).toBe('https://example.com/signed-url');
  });

  it('creates a game without imageKey', async () => {
    gamesRepo.create.mockResolvedValue({ id: 'g1', userId: 'u1', title: 'My Game' });
    const result = await service.createGame('u1', { title: 'My Game' });
    expect(result.image).toBeUndefined();
  });

  it('fetches games with resolved image URLs', async () => {
    gamesRepo.findByUserId.mockResolvedValue([
      { id: 'g1', userId: 'u1', title: 'Game 1', imageKey: 'stonemanage/images/u1/img1' },
      { id: 'g2', userId: 'u1', title: 'Game 2' },
    ]);
    const results = await service.getGames('u1');
    expect(results[0].image).toBe('https://example.com/signed-url');
    expect(results[1].image).toBeUndefined();
  });

  it('rejects updating game image for another user', async () => {
    gamesRepo.getById.mockResolvedValue({ id: 'g1', userId: 'u1' });
    await expect(
      service.updateGame('g1', 'u2', { imageKey: 'stonemanage/images/u2/img1' }),
    ).rejects.toThrow(ErrorCodes.STONEMANAGE.FORBIDDEN);
  });

  it('cleans up old image when game image is replaced', async () => {
    gamesRepo.getById.mockResolvedValue({ id: 'g1', userId: 'u1', imageKey: 'old-key' });
    gamesRepo.update.mockResolvedValue({ id: 'g1', userId: 'u1', imageKey: 'new-key' });
    await service.updateGame('g1', 'u1', { imageKey: 'new-key' });
    expect(storage.deleteObject).toHaveBeenCalledWith('old-key');
  });

  it('cleans up images when deleting a game with images', async () => {
    gamesRepo.getById.mockResolvedValue({ id: 'g1', userId: 'u1', imageKey: 'game-img' });
    stonesRepo.findByGameId.mockResolvedValue([{ id: 's1', imageKey: 'stone-img' }]);
    await service.deleteGame('g1', 'u1');
    expect(storage.deleteObject).toHaveBeenCalledWith('stone-img');
    expect(storage.deleteObject).toHaveBeenCalledWith('game-img');
  });
});
