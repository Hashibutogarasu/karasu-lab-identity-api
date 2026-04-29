import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { User } from '../../apps/stonemanage/stonemanage.schema.js';

export const GqlUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User | undefined => {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext<{ req: Request & { user?: User } }>();
    return req.user;
  },
);
