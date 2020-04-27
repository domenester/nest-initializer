/* eslint-disable @typescript-eslint/camelcase */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthMocks } from './mocks';
import { defaultAdmin, defaultAdminPassword } from '../src/scripts/seed/seeders/user/faker';
import { DefaultHeader } from './utils';

describe('PasswordController (e2e)', () => {
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

  it('expect to throw with invalid email', async () => {
    const { password } = defaultAdmin
    await request(app.getHttpServer())
      .post('/password/reset')
      .set(DefaultHeader(auth_token))
      .send({ email: 'invalid', password })
      .expect(400)
  });

  it('expect to throw with invalid password length', async () => {
    const { email } = defaultAdmin
    await request(app.getHttpServer())
      .post('/password/reset')
      .set(DefaultHeader(auth_token))
      .send({ email, password: '1234567' })
      .expect(400)
  });

  it('/password/reset (POST)', async () => {
    const { email } = defaultAdmin
    await request(app.getHttpServer())
      .post('/password/reset')
      .set(DefaultHeader(auth_token))
      .send({ email, password: defaultAdminPassword })
      .expect(200)
  });
});
