/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@thallesp/nestjs-better-auth';
import { Auth as BetterAuthType } from 'better-auth';
import { toNodeHandler } from 'better-auth/node';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService<BetterAuthType>) {}

  use(req: Request, res: Response, _next: NextFunction) {
    const auth = this.authService.instance;
    const handler = toNodeHandler(auth);
    return handler(req as any, res as any);
  }
}
