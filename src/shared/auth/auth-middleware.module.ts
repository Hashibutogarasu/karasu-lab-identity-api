import { Module, DynamicModule, NestModule, MiddlewareConsumer, RequestMethod, Inject } from '@nestjs/common';
import { AuthMiddleware } from './auth.middleware.js';

export const AUTH_MIDDLEWARE_OPTIONS = 'AUTH_MIDDLEWARE_OPTIONS';

export interface AuthMiddlewareOptions {
  path: string;
}

@Module({})
export class AuthMiddlewareModule implements NestModule {
  constructor(@Inject(AUTH_MIDDLEWARE_OPTIONS) private options: AuthMiddlewareOptions) {}

  static forRoot(options: AuthMiddlewareOptions): DynamicModule {
    return {
      module: AuthMiddlewareModule,
      providers: [
        {
          provide: AUTH_MIDDLEWARE_OPTIONS,
          useValue: options,
        },
        AuthMiddleware,
      ],
      exports: [AuthMiddleware],
    };
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: `${this.options.path}(.*)`, method: RequestMethod.ALL });
  }
}
