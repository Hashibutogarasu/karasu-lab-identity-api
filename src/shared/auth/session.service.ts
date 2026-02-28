import { Injectable } from '@nestjs/common';
import { AuthService } from '@thallesp/nestjs-better-auth';
import { Auth as BetterAuthType } from 'better-auth';
import { fromNodeHeaders } from 'better-auth/node';
import type { Request } from 'express';

import { ErrorCodes } from '../errors/error.codes.js';

@Injectable()
export class SessionService {
  constructor(private readonly authService: AuthService<BetterAuthType>) {}

  /** Require an authenticated session; throw 401 if absent. */
  async requireSession(req: Request) {
    const session = await this.authService.instance.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) throw ErrorCodes.AUTH.UNAUTHORIZED;
    return session;
  }

  /** Try to get the session; return null if the request is anonymous. */
  optionalSession(req: Request) {
    return this.authService.instance.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
  }
}
