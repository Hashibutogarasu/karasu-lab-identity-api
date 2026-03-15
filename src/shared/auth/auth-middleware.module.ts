import { Module, DynamicModule, NestModule, MiddlewareConsumer, RequestMethod, Inject } from '@nestjs/common';
import { AuthMiddleware } from './auth.middleware.js';
import { AUTH_MIDDLEWARE_OPTIONS, type AuthMiddlewareOptions } from './auth-middleware.constants.js';

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
      .forRoutes({ path: `${this.options.path}*path`, method: RequestMethod.ALL });
  }
}
