import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';
import { SessionService } from '../../auth/session.service.js';
import { Request } from 'express';
import { ErrorCodes } from '../../errors/error.codes.js';

@Injectable()
export class IdTokenGuard implements CanActivate {
  constructor(private readonly sessionService: SessionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const session = (await this.sessionService.requireSession(
      req,
    )) as unknown as { firebaseIdToken: string };

    if (!session || !session.firebaseIdToken) {
      throw ErrorCodes.AUTH.UNAUTHORIZED;
    }

    try {
      const auth = getAuth();
      await auth.verifyIdToken(session.firebaseIdToken);
      return true;
    } catch {
      throw ErrorCodes.AUTH.UNAUTHORIZED;
    }
  }
}
