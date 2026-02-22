import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Module } from '@nestjs/common';
import { App } from 'supertest/types.js';
import request from 'supertest';
import { AppController } from '../src/app.controller.js';
import { AppService } from '../src/app.service.js';

@Module({
  controllers: [AppController],
  providers: [AppService],
})
class TestAppModule { }

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestAppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200);
  });
});