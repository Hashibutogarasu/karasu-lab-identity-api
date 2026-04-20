import { describe, it, expect, vi, beforeEach } from 'vite-plus/test';
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

function makeContext(
  handlerRoles?: string[],
  classRoles?: string[],
): ExecutionContext {
  return {
    getHandler: () => ({ roles: handlerRoles }),
    getClass: () => ({ roles: classRoles }),
    switchToHttp: () => ({
      getRequest: () =>
        ({}) as ReturnType<
          ReturnType<ExecutionContext['switchToHttp']>['getRequest']
        >,
    }),
  } as unknown as ExecutionContext;
}

function makeSession(role?: string | null): MockSession {
  return {
    user: { id: 'user-1', role: role === undefined ? undefined : role },
    session: {},
  };
}

describe('RolesGuard', () => {
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

  describe('endpoint with no @Roles() metadata', () => {
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

  describe('endpoint requiring admin role', () => {
    beforeEach(() => {
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue([
        UserRole.ADMIN,
      ]);
    });

    it('throws AUTH.UNAUTHORIZED when session is absent', async () => {
      vi.mocked(sessionService.optionalSession).mockResolvedValue(null);

      const ctx = makeContext([UserRole.ADMIN]);
      await expect(guard.canActivate(ctx)).rejects.toThrow(
        ErrorCodes.AUTH.UNAUTHORIZED,
      );
    });

    it('throws AUTH.FORBIDDEN when user role is "user"', async () => {
      vi.mocked(sessionService.optionalSession).mockResolvedValue(
        makeSession(UserRole.USER) as never,
      );

      const ctx = makeContext([UserRole.ADMIN]);
      await expect(guard.canActivate(ctx)).rejects.toThrow(
        ErrorCodes.AUTH.FORBIDDEN,
      );
    });

    it('throws AUTH.FORBIDDEN when user role is null (treated as user)', async () => {
      vi.mocked(sessionService.optionalSession).mockResolvedValue(
        makeSession(null) as never,
      );

      const ctx = makeContext([UserRole.ADMIN]);
      await expect(guard.canActivate(ctx)).rejects.toThrow(
        ErrorCodes.AUTH.FORBIDDEN,
      );
    });

    it('passes through when user role is "admin"', async () => {
      vi.mocked(sessionService.optionalSession).mockResolvedValue(
        makeSession(UserRole.ADMIN) as never,
      );

      const ctx = makeContext([UserRole.ADMIN]);
      const result = await guard.canActivate(ctx);

      expect(result).toBe(true);
    });

    it('throws AUTH.FORBIDDEN when user role field is undefined (treated as user)', async () => {
      vi.mocked(sessionService.optionalSession).mockResolvedValue(
        makeSession(undefined) as never,
      );

      const ctx = makeContext([UserRole.ADMIN]);
      await expect(guard.canActivate(ctx)).rejects.toThrow(
        ErrorCodes.AUTH.FORBIDDEN,
      );
    });
  });

  describe('endpoint allowing multiple roles', () => {
    beforeEach(() => {
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue([
        UserRole.ADMIN,
        UserRole.USER,
      ]);
    });

    it('passes through when user role is "user"', async () => {
      vi.mocked(sessionService.optionalSession).mockResolvedValue(
        makeSession(UserRole.USER) as never,
      );

      const ctx = makeContext([UserRole.ADMIN, UserRole.USER]);
      const result = await guard.canActivate(ctx);

      expect(result).toBe(true);
    });

    it('passes through when user role is "admin"', async () => {
      vi.mocked(sessionService.optionalSession).mockResolvedValue(
        makeSession(UserRole.ADMIN) as never,
      );

      const ctx = makeContext([UserRole.ADMIN, UserRole.USER]);
      const result = await guard.canActivate(ctx);

      expect(result).toBe(true);
    });
  });

  describe('error code identity', () => {
    it('thrown error for unauthenticated request is AUTH.UNAUTHORIZED', () => {
      expect(ErrorCodes.AUTH.UNAUTHORIZED.key).toBe('auth.unauthorized');
      expect(ErrorCodes.AUTH.UNAUTHORIZED.status).toBe('UNAUTHORIZED');
    });

    it('thrown error for insufficient role is AUTH.FORBIDDEN', () => {
      expect(ErrorCodes.AUTH.FORBIDDEN.key).toBe('auth.forbidden');
      expect(ErrorCodes.AUTH.FORBIDDEN.status).toBe('FORBIDDEN');
    });
  });
});
