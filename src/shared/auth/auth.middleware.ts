import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Reflector } from '@nestjs/core';
import { AuthService } from '@thallesp/nestjs-better-auth';
import { Auth as BetterAuthType } from 'better-auth';
import { toNodeHandler } from 'better-auth/node';
import {
  AUTH_MIDDLEWARE_OPTIONS,
  type AuthMiddlewareOptions,
} from './auth-middleware.constants.js';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService<BetterAuthType>,
    @Inject(AUTH_MIDDLEWARE_OPTIONS)
    private readonly options: AuthMiddlewareOptions,
    private readonly reflector: Reflector,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const auth = this.authService.instance;
    const handler = toNodeHandler(auth);

    try {
      await handler(req as any, res as any);
      if (!res.headersSent) {
        next();
      }
    } catch (error) {
      next(error);
    }
  }
}
