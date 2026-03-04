import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@hashibutogarasu/common';

import { RolesGuard } from '../../src/shared/auth/roles.guard.js';
import { SessionService } from '../../src/shared/auth/session.service.js';
import { ErrorCodes } from '../../src/shared/errors/error.codes.js';

type MockSession = {
  user: { id: string; role?: string | null };
  session: Record<string, unknown>;
};

function makeContext(handlerRoles?: string[], classRoles?: string[]): ExecutionContext {
  return {
    getHandler: () => ({ roles: handlerRoles }),
    getClass: () => ({ roles: classRoles }),
    switchToHttp: () => ({
      getRequest: () => ({} as ReturnType<ReturnType<ExecutionContext['switchToHttp']>['getRequest']>),
    }),
  } as unknown as ExecutionContext;
}

function makeSession(role?: string | null): MockSession {
  return {
    user: { id: 'user-1', role: role === undefined ? undefined : role },
    session: {},
  };
}

/**
 * RolesGuard behaviour tests scoped to attachment controller scenarios.
 * Verifies that POST / PUT / DELETE attachment endpoints require ADMIN role,
 * while GET endpoints pass through without a session.
 */
describe('AttachmentController — RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;
  let sessionService: SessionService;

  beforeEach(() => {
    reflector = new Reflector();
    sessionService = {
      optionalSession: vi.fn(),
      requireSession: vi.fn(),
    } as unknown as SessionService;

    guard = new RolesGuard(reflector, sessionService);
  });

  describe('GET /attachments and GET /attachments/:id — no @Roles()', () => {
    it('passes through without checking the session', async () => {
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

      const ctx = makeContext();
      const result = await guard.canActivate(ctx);

      expect(result).toBe(true);
      expect(sessionService.optionalSession).not.toHaveBeenCalled();
    });

    it('passes through when roles array is empty', async () => {
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue([]);

      const ctx = makeContext();
      const result = await guard.canActivate(ctx);

      expect(result).toBe(true);
    });
  });

  describe('POST /attachments/:blogId — requires ADMIN', () => {
    beforeEach(() => {
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.ADMIN]);
    });

    it('throws AUTH.UNAUTHORIZED when session is absent', async () => {
      vi.mocked(sessionService.optionalSession).mockResolvedValue(null);

      const ctx = makeContext([UserRole.ADMIN]);
      await expect(guard.canActivate(ctx)).rejects.toThrow(ErrorCodes.AUTH.UNAUTHORIZED);
    });

    it('throws AUTH.FORBIDDEN when user role is "user"', async () => {
      vi.mocked(sessionService.optionalSession).mockResolvedValue(
        makeSession(UserRole.USER) as never,
      );

      const ctx = makeContext([UserRole.ADMIN]);
      await expect(guard.canActivate(ctx)).rejects.toThrow(ErrorCodes.AUTH.FORBIDDEN);
    });

    it('throws AUTH.FORBIDDEN when user role is null (treated as user)', async () => {
      vi.mocked(sessionService.optionalSession).mockResolvedValue(
        makeSession(null) as never,
      );

      const ctx = makeContext([UserRole.ADMIN]);
      await expect(guard.canActivate(ctx)).rejects.toThrow(ErrorCodes.AUTH.FORBIDDEN);
    });

    it('passes through when user role is "admin"', async () => {
      vi.mocked(sessionService.optionalSession).mockResolvedValue(
        makeSession(UserRole.ADMIN) as never,
      );

      const ctx = makeContext([UserRole.ADMIN]);
      const result = await guard.canActivate(ctx);

      expect(result).toBe(true);
    });
  });

  describe('PUT /attachments/:id — requires ADMIN', () => {
    beforeEach(() => {
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.ADMIN]);
    });

    it('throws AUTH.UNAUTHORIZED when session is absent', async () => {
      vi.mocked(sessionService.optionalSession).mockResolvedValue(null);

      const ctx = makeContext([UserRole.ADMIN]);
      await expect(guard.canActivate(ctx)).rejects.toThrow(ErrorCodes.AUTH.UNAUTHORIZED);
    });

    it('throws AUTH.FORBIDDEN when user role is "user"', async () => {
      vi.mocked(sessionService.optionalSession).mockResolvedValue(
        makeSession(UserRole.USER) as never,
      );

      const ctx = makeContext([UserRole.ADMIN]);
      await expect(guard.canActivate(ctx)).rejects.toThrow(ErrorCodes.AUTH.FORBIDDEN);
    });

    it('passes through when user role is "admin"', async () => {
      vi.mocked(sessionService.optionalSession).mockResolvedValue(
        makeSession(UserRole.ADMIN) as never,
      );

      const ctx = makeContext([UserRole.ADMIN]);
      const result = await guard.canActivate(ctx);

      expect(result).toBe(true);
    });
  });

  describe('DELETE /attachments/:id — requires ADMIN', () => {
    beforeEach(() => {
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.ADMIN]);
    });

    it('throws AUTH.UNAUTHORIZED when session is absent', async () => {
      vi.mocked(sessionService.optionalSession).mockResolvedValue(null);

      const ctx = makeContext([UserRole.ADMIN]);
      await expect(guard.canActivate(ctx)).rejects.toThrow(ErrorCodes.AUTH.UNAUTHORIZED);
    });

    it('throws AUTH.FORBIDDEN when user role is "user"', async () => {
      vi.mocked(sessionService.optionalSession).mockResolvedValue(
        makeSession(UserRole.USER) as never,
      );

      const ctx = makeContext([UserRole.ADMIN]);
      await expect(guard.canActivate(ctx)).rejects.toThrow(ErrorCodes.AUTH.FORBIDDEN);
    });

    it('passes through when user role is "admin"', async () => {
      vi.mocked(sessionService.optionalSession).mockResolvedValue(
        makeSession(UserRole.ADMIN) as never,
      );

      const ctx = makeContext([UserRole.ADMIN]);
      const result = await guard.canActivate(ctx);

      expect(result).toBe(true);
    });
  });

  describe('POST /attachments/:blogId/upload-url — requires ADMIN', () => {
    beforeEach(() => {
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.ADMIN]);
    });

    it('throws AUTH.UNAUTHORIZED when session is absent', async () => {
      vi.mocked(sessionService.optionalSession).mockResolvedValue(null);

      const ctx = makeContext([UserRole.ADMIN]);
      await expect(guard.canActivate(ctx)).rejects.toThrow(ErrorCodes.AUTH.UNAUTHORIZED);
    });

    it('throws AUTH.FORBIDDEN when user role is "user"', async () => {
      vi.mocked(sessionService.optionalSession).mockResolvedValue(
        makeSession(UserRole.USER) as never,
      );

      const ctx = makeContext([UserRole.ADMIN]);
      await expect(guard.canActivate(ctx)).rejects.toThrow(ErrorCodes.AUTH.FORBIDDEN);
    });

    it('passes through when user role is "admin"', async () => {
      vi.mocked(sessionService.optionalSession).mockResolvedValue(
        makeSession(UserRole.ADMIN) as never,
      );

      const ctx = makeContext([UserRole.ADMIN]);
      const result = await guard.canActivate(ctx);

      expect(result).toBe(true);
    });
  });

  describe('POST /attachments/:id/sync — requires ADMIN', () => {
    beforeEach(() => {
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.ADMIN]);
    });

    it('throws AUTH.UNAUTHORIZED when session is absent', async () => {
      vi.mocked(sessionService.optionalSession).mockResolvedValue(null);

      const ctx = makeContext([UserRole.ADMIN]);
      await expect(guard.canActivate(ctx)).rejects.toThrow(ErrorCodes.AUTH.UNAUTHORIZED);
    });

    it('throws AUTH.FORBIDDEN when user role is "user"', async () => {
      vi.mocked(sessionService.optionalSession).mockResolvedValue(
        makeSession(UserRole.USER) as never,
      );

      const ctx = makeContext([UserRole.ADMIN]);
      await expect(guard.canActivate(ctx)).rejects.toThrow(ErrorCodes.AUTH.FORBIDDEN);
    });

    it('passes through when user role is "admin"', async () => {
      vi.mocked(sessionService.optionalSession).mockResolvedValue(
        makeSession(UserRole.ADMIN) as never,
      );

      const ctx = makeContext([UserRole.ADMIN]);
      const result = await guard.canActivate(ctx);

      expect(result).toBe(true);
    });
  });
});
