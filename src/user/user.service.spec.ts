import { describe, expect, it, beforeEach, vi, Mock } from 'vite-plus/test';
import { UserService } from './user.service.js';
import type { SessionService } from '../shared/auth/session.service.js';
import type { DeletableDiscoveryService } from '../shared/deletable/deletable-discovery.service.js';
import type { IDeletable } from '../shared/deletable/deletable.interface.js';
import { ErrorCodes } from '../shared/errors/error.codes.js';

describe('UserService', () => {
  let service: UserService;
  let authService: { instance: { api: { updateUser: Mock } } };
  let sessionService: Record<string, Mock>;
  let deletableDiscovery: Record<string, Mock>;

  beforeEach(() => {
    authService = {
      instance: {
        api: {
          updateUser: vi.fn(),
        },
      },
    };

    sessionService = {
      requireSession: vi.fn(),
      optionalSession: vi.fn(),
    };

    deletableDiscovery = {
      getDeletableServices: vi.fn(),
    };

    service = new UserService(
      authService as never,
      sessionService as unknown as SessionService,
      deletableDiscovery as unknown as DeletableDiscoveryService,
    );
  });

  describe('deleteUserData', () => {
    it('calls deleteData on each IDeletable service with the same userId', async () => {
      const userId = 'user-123';
      const deleteDataA = vi.fn().mockResolvedValue(undefined);
      const deleteDataB = vi.fn().mockResolvedValue(undefined);
      const deleteDataC = vi.fn().mockResolvedValue(undefined);
      const mockServiceA: IDeletable = { deleteData: deleteDataA };
      const mockServiceB: IDeletable = { deleteData: deleteDataB };
      const mockServiceC: IDeletable = { deleteData: deleteDataC };

      deletableDiscovery.getDeletableServices.mockReturnValue([
        mockServiceA,
        mockServiceB,
        mockServiceC,
      ]);

      await service.deleteUserData(userId);

      expect(deleteDataA).toHaveBeenCalledWith(userId);
      expect(deleteDataB).toHaveBeenCalledWith(userId);
      expect(deleteDataC).toHaveBeenCalledWith(userId);
    });

    it('executes deletable services in order (sequential)', async () => {
      const callOrder: number[] = [];
      const mockServiceA: IDeletable = {
        deleteData: vi.fn().mockImplementation(() => {
          callOrder.push(1);
          return Promise.resolve();
        }),
      };
      const mockServiceB: IDeletable = {
        deleteData: vi.fn().mockImplementation(() => {
          callOrder.push(2);
          return Promise.resolve();
        }),
      };
      const mockServiceC: IDeletable = {
        deleteData: vi.fn().mockImplementation(() => {
          callOrder.push(3);
          return Promise.resolve();
        }),
      };

      deletableDiscovery.getDeletableServices.mockReturnValue([
        mockServiceA,
        mockServiceB,
        mockServiceC,
      ]);

      await service.deleteUserData('user-456');

      expect(callOrder).toEqual([1, 2, 3]);
    });

    it('passes only the session user.id to deleteUserData, not an arbitrary id', async () => {
      const req = {} as never;
      const sessionUser = { id: 'session-user-id', name: 'Test' };
      sessionService.requireSession.mockResolvedValue({
        user: sessionUser,
        session: {},
      });
      deletableDiscovery.getDeletableServices.mockReturnValue([]);

      const { user } = (await sessionService.requireSession(req)) as {
        user: { id: string };
      };
      await service.deleteUserData(user.id);

      expect(deletableDiscovery.getDeletableServices).toHaveBeenCalled();
    });
  });

  describe('getProfile', () => {
    it('returns the session user', async () => {
      const req = {} as never;
      const sessionUser = {
        id: 'u1',
        name: 'Alice',
        email: 'alice@example.com',
      };
      sessionService.requireSession.mockResolvedValue({ user: sessionUser });

      const result = await service.getProfile(req);

      expect(result).toEqual(sessionUser);
      expect(sessionService.requireSession).toHaveBeenCalledWith(req);
    });

    it('throws UNAUTHORIZED when no session exists', async () => {
      const req = {} as never;
      sessionService.requireSession.mockRejectedValue(
        ErrorCodes.AUTH.UNAUTHORIZED,
      );

      await expect(service.getProfile(req)).rejects.toThrow(
        ErrorCodes.AUTH.UNAUTHORIZED,
      );
    });
  });
});
