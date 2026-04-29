import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { Request } from 'express';
import { IFirebaseAdminProvider } from '../firebase/firebase-admin.provider.interface.js';
import { User } from '../../apps/stonemanage/stonemanage.schema.js';

export const RequireOwnership = (collection: string) =>
  SetMetadata('ownership', collection);

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private firebase: IFirebaseAdminProvider,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const collection = this.reflector.get<string>(
      'ownership',
      context.getHandler(),
    );
    if (!collection) return true;

    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext<{ req: Request & { user?: User } }>();
    const user = req.user;
    if (!user) return false;

    const args = gqlContext.getArgs<{ id?: string }>();
    const resourceId = args.id;
    if (!resourceId) return true;

    const doc = await this.firebase.db
      .collection(collection)
      .doc(resourceId)
      .get();
    if (!doc.exists) return true;

    const data = doc.data() as { userId?: string };
    if (data?.userId !== user.id) {
      throw new ForbiddenException(
        'You do not have permission to access this resource.',
      );
    }

    return true;
  }
}
