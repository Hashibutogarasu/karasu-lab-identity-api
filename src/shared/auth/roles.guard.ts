import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { UserRole } from '@hashibutogarasu/common';

import { SessionService } from './session.service.js';
import { ErrorCodes } from '../errors/error.codes.js';
import { ROLES_KEY } from './roles.decorator.js';

/**
 * Guard that enforces role-based access control on routes decorated with @Roles().
 * Skips role checks for routes without @Roles() metadata.
 * Throws AUTH.UNAUTHORIZED if the session is absent, AUTH.FORBIDDEN if the role is insufficient.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly sessionService: SessionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const session = await this.sessionService.optionalSession(req);

    if (!session) throw ErrorCodes.AUTH.UNAUTHORIZED;

    const userRole = (session.user as { role?: string | null }).role ?? UserRole.USER;
    if (!requiredRoles.includes(userRole)) throw ErrorCodes.AUTH.FORBIDDEN;

    return true;
  }
}
