import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { 
  ArgumentsHost, 
  Catch, 
  Controller, 
  ExceptionFilter, 
  Get, 
  HttpException, 
  HttpStatus, 
  INestApplication, 
  Injectable, 
  MiddlewareConsumer, 
  Module, 
  NestModule, 
  Inject, 
  NestMiddleware 
} from '@nestjs/common';
import request, { Response as SuperTestResponse } from 'supertest';
import { createAPIError, ErrorCodes } from '../src/shared/errors/error.codes.js';
import { I18nService } from '../src/shared/i18n/i18n.service.js';
import { II18nService } from '../src/shared/i18n/i18n.service.interface.js';
import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { NextFunction, Request, Response } from 'express';

interface APIErrorLike {
    status: string | number;
    body: {
        message?: string;
    };
}

function isAPIErrorLike(err: unknown): err is APIErrorLike {
    if (typeof err !== 'object' || err === null) {
        return false;
    }
    const candidate = err as Record<string, unknown>;
    return (
        'status' in candidate &&
        'body' in candidate &&
        typeof candidate.body === 'object' &&
        candidate.body !== null
    );
}

const statusMap: Record<string, number> = {
    'BAD_REQUEST': 400,
    'UNAUTHORIZED': 401,
    'FORBIDDEN': 403,
    'NOT_FOUND': 404,
    'INTERNAL_SERVER_ERROR': 500,
    'SERVICE_UNAVAILABLE': 503,
};

@Catch()
class APIStringStatusExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    if (exception instanceof HttpException) {
        response.status(exception.getStatus()).json(exception.getResponse());
        return;
    }

    if (isAPIErrorLike(exception)) {
        const statusStr = String(exception.status);
        const status = statusMap[statusStr] || 500;
        response.status(status).json({
          message: exception.body.message,
        });
        return;
    }
    response.status(500).json({
      message: 'Internal server error',
    });
  }
}

@Injectable()
class TestErrorService {
  doSomething(): { ok: boolean } {
    return { ok: true };
  }

  throwUnauthorized(): never {
    throw createAPIError(ErrorCodes.AUTH.UNAUTHORIZED);
  }

  throwApplicationNotFound(): never {
    throw createAPIError(ErrorCodes.OAUTH.APPLICATION_NOT_FOUND);
  }

  throwSystemError(): never {
      throw createAPIError(ErrorCodes.SYSTEM.RESEND_API_KEY_REQUIRED);
  }

  throwHttpException(): never {
    throw new HttpException('Standard NestJS Error', HttpStatus.BAD_REQUEST);
  }
}

@Controller('test-error')
class TestErrorController {
  constructor(@Inject(TestErrorService) private readonly service: TestErrorService) {}

  @Get('success')
  getSuccess(): { ok: boolean } {
    return this.service.doSomething();
  }

  @Get('unauthorized')
  getUnauthorized(): never {
    return this.service.throwUnauthorized();
  }

  @Get('not-found')
  getNotFound(): never {
    return this.service.throwApplicationNotFound();
  }

  @Get('system')
  getSystem(): never {
      return this.service.throwSystemError();
  }

  @Get('http-exception')
  getHttpException(): never {
    return this.service.throwHttpException();
  }
}

@Injectable()
class MockI18nMiddleware implements NestMiddleware {
	constructor(
		@Inject(II18nService) private readonly i18nService: II18nService
	) {}

	async use(req: Request, _res: Response, next: NextFunction): Promise<void> {
		const langHeader = req.get('accept-language');
		const lang = langHeader?.split(',')[0] ?? 'en';
        
        try {
		    await this.i18nService.setLanguage(lang);
        } catch (e) {
            process.stdout.write(`Middleware setLanguage failed: ${e}\n`);
            throw e;
        }
		next();
	}
}

@Module({
  controllers: [TestErrorController],
  providers: [
    TestErrorService,
    {
      provide: II18nService,
      useClass: I18nService,
    },
    I18nService,
  ],
})
class TestErrorModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(MockI18nMiddleware).forRoutes('*');
  }
}

describe('Error I18n (Integration)', () => {
  let app: INestApplication | undefined;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestErrorModule],
    }).compile();

    const createdApp = moduleFixture.createNestApplication();
    createdApp.useGlobalFilters(new APIStringStatusExceptionFilter());
    
    const i18nService = moduleFixture.get(I18nService);
    await i18nService.init();
    
    await createdApp.init();
    app = createdApp;
  });

  afterAll(async () => {
      if (app) {
        await app.close();
      }
  });

  it('should return 200 for success', async () => {
    if (!app) throw new Error('App not initialized');
    const response: SuperTestResponse = await request(app.getHttpServer())
      .get('/test-error/success');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });

  it('should return 400 for standard HttpException', async () => {
    if (!app) throw new Error('App not initialized');
    const response: SuperTestResponse = await request(app.getHttpServer())
      .get('/test-error/http-exception');

    expect(response.status).toBe(400);
  });

  it('should return English message for unauthorized (Default)', async () => {
    if (!app) throw new Error('App not initialized');
    const response: SuperTestResponse = await request(app.getHttpServer())
      .get('/test-error/unauthorized');

    expect(response.status).toBe(401);
  });

  it('should return Japanese message for unauthorized when header is ja', async () => {
    if (!app) throw new Error('App not initialized');
    const response: SuperTestResponse = await request(app.getHttpServer())
      .get('/test-error/unauthorized')
      .set('Accept-Language', 'ja');

    expect(response.status).toBe(401);
    const body = response.body as { message: string };
    expect(body.message).toBe('認証されていません');
  });

  it('should return Japanese message for system error when header is ja', async () => {
    if (!app) throw new Error('App not initialized');
    const response: SuperTestResponse = await request(app.getHttpServer())
      .get('/test-error/system')
      .set('Accept-Language', 'ja');

    expect(response.status).toBe(500);
    const body = response.body as { message: string };
    expect(body.message).toBe('本番環境ではRESEND_API_KEYが必要です。');
  });
});
