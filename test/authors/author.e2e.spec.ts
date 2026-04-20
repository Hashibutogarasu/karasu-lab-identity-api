import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vite-plus/test';
import {
  AuthorController,
  AuthorLegacyController,
} from '../../src/authors/author.controller.js';
import { AuthorService } from '../../src/authors/author.service.js';
import { IConfigService } from '../../src/shared/config/config.service.interface.js';
import { RolesGuard } from '../../src/shared/auth/roles.guard.js';
import { getPrisma } from '../../src/prisma.js';
import { MockFirebaseAdminProvider } from '../mocks/firebase-admin.provider.mock.js';
import { IFirebaseAdminProvider } from '../../src/shared/firebase/firebase-admin.provider.interface.js';
import { AuthService } from '@thallesp/nestjs-better-auth';
import { UserResponseDto } from '../../src/blogs/dto/user-response.dto.js';
import { SessionService } from '../../src/shared/auth/session.service.js';
import { GlobalExceptionFilter } from '../../src/shared/errors/global-exception.filter.js';
import { setupI18n } from '../../src/shared/i18n/i18n.setup.js';

describe('AuthorController (e2e)', () => {
  let app: INestApplication;
  const prisma = getPrisma();
  const suffix = Date.now();
  const testUserId = `e2e-author-${suffix}`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController, AuthorLegacyController],
      providers: [
        AuthorService,
        {
          provide: IFirebaseAdminProvider,
          useValue: new MockFirebaseAdminProvider(),
        },
        {
          provide: AuthService,
          useValue: {
            instance: {
              api: {
                getSession: () => Promise.resolve(null),
              },
            },
          },
        },
        {
          provide: SessionService,
          useValue: {
            optionalSession: () => Promise.resolve(null),
            requireSession: () => Promise.resolve({ user: { id: 'dummy' } }),
          },
        },
        {
          provide: IConfigService,
          useValue: {
            get: (key: string) => (key === 'auth.roles' ? [] : null),
          },
        },
      ],
    })
      .overrideGuard(RolesGuard)
      .useValue({
        canActivate: () => Promise.resolve(true),
      })
      .compile();

    await setupI18n();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new GlobalExceptionFilter());
    await app.init();

    await prisma.user.create({
      data: {
        id: testUserId,
        name: 'E2E Author Test',
        email: `e2e-author-${suffix}@example.com`,
      },
    });
  });

  afterAll(async () => {
    if (testUserId) {
      await prisma.user.deleteMany({ where: { id: testUserId } });
    }
    if (app) {
      await app.close();
    }
  });

  it('GET /author - should return a list of authors', async () => {
    const response = await request(app.getHttpServer()).get('/author');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    const authors = response.body as UserResponseDto[];
    const author = authors.find((u) => u.id === testUserId);
    expect(author).toBeDefined();
    expect(author?.name).toBe('E2E Author Test');
  });

  it('GET /author/:id - should return a single author', async () => {
    const response = await request(app.getHttpServer()).get(
      `/author/${testUserId}`,
    );
    expect(response.status).toBe(200);
    const author = response.body as UserResponseDto;
    expect(author.id).toBe(testUserId);
    expect(author.name).toBe('E2E Author Test');
  });

  it('GET /author/:id - should return 200 and empty object for non-existent author', async () => {
    const response = await request(app.getHttpServer()).get(
      '/author/non-existent-id',
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual({});
  });

  it('GET /authors - should return paginated list of authors', async () => {
    const response = await request(app.getHttpServer()).get('/authors');
    expect(response.status).toBe(200);
    const body = response.body as {
      data: UserResponseDto[];
      hasMore: boolean;
      nextCursor: string | null;
    };
    expect(Array.isArray(body.data)).toBe(true);
    expect(body).toHaveProperty('hasMore');
    expect(body).toHaveProperty('nextCursor');
    const author = body.data.find((u) => u.id === testUserId);
    expect(author).toBeDefined();
    expect(author?.name).toBe('E2E Author Test');
  });

  it('GET /authors - respects limit query parameter', async () => {
    const response = await request(app.getHttpServer()).get('/authors?limit=1');
    expect(response.status).toBe(200);
    const body = response.body as { data: UserResponseDto[] };
    expect(body.data.length).toBeLessThanOrEqual(1);
  });

  it('GET /authors/:id - should return a single author', async () => {
    const response = await request(app.getHttpServer()).get(
      `/authors/${testUserId}`,
    );
    expect(response.status).toBe(200);
    const author = response.body as UserResponseDto;
    expect(author.id).toBe(testUserId);
    expect(author.name).toBe('E2E Author Test');
  });

  it('GET /authors/:id - should return 200 and empty object for non-existent author', async () => {
    const response = await request(app.getHttpServer()).get(
      '/authors/non-existent-id',
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual({});
  });
});
