/* eslint-disable @typescript-eslint/camelcase */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthMocks } from './mocks';
import { defaultAdmin, defaultAdminPassword } from '../src/scripts/seed/seeders/user/faker';
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

    const { body: { access_token }} = await request(app.getHttpServer())
      .post('/auth/login')
      .send(AuthMocks.authLogin.valid)
    
    auth_token = access_token
  });

  it('expect to throw with invalid email)', async () => {
    await request(app.getHttpServer())
      .post('/users/create')
      .set(DefaultHeader(auth_token))
      .send({ ...defaultAdmin, email: 'invalidemail' })
      .expect(400)
  });

  it('expect to throw with invalid password length)', async () => {
    await request(app.getHttpServer())
      .post('/users/create')
      .set(DefaultHeader(auth_token))
      .send({ ...defaultAdmin, password: '1234567' })
      .expect(400)
  });

  it('/users/create (POST)', async () => {
    await request(app.getHttpServer())
      .post('/users/create')
      .set(DefaultHeader(auth_token))
      .send(defaultAdmin)
  });
});
