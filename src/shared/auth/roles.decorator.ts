import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Attach required roles metadata to a route handler or controller class.
 * Used in conjunction with RolesGuard to enforce role-based access control.
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
