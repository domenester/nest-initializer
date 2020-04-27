/* eslint-disable @typescript-eslint/camelcase */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthMocks } from './mocks';
import { defaultAdmin } from '../src/scripts/seed/seeders/user/faker';
import { DefaultHeader } from './utils';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let auth_token;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users/create (POST)', async () => {
    const { body: { access_token }} = await request(app.getHttpServer())
      .post('/auth/login')
      .send(AuthMocks.authLogin.valid)

    const { email, password } = defaultAdmin
    await request(app.getHttpServer())
      .post('/users/create')
      .set(DefaultHeader(access_token))
      .send({ email, password })
      .expect(201)
  });

  it.only('/users/create (POST) (invalid email)', async () => {
    const { body: { access_token }} = await request(app.getHttpServer())
      .post('/auth/login')
      .send(AuthMocks.authLogin.valid)

    const { email, password } = defaultAdmin
    await request(app.getHttpServer())
      .post('/users/create')
      .set(DefaultHeader(access_token))
      .send({ email: 'invalidemail', password })
      .expect(201)
  });
});
