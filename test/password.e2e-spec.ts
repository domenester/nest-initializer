/* eslint-disable @typescript-eslint/camelcase */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthMocks } from './mocks';
import { defaultAdmin, defaultAdminPassword } from '../src/scripts/seed/seeders/user/faker';
import { DefaultHeader } from './utils';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../src/auth/constants';
import jwtConfig from '../src/config/jwt'

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

  it('expect to throw with invalid password length', async () => {
    await request(app.getHttpServer())
      .post('/password/reset')
      .set(DefaultHeader(auth_token))
      .send({ password: '1234567' })
      .expect(400)
  });

  it('/password/reset (POST)', async () => {
    const { email } = defaultAdmin
    const jwtService: JwtService = new JwtService({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConfig.expiresInDefault },
    })
    await request(app.getHttpServer())
      .post('/password/reset')
      .set(DefaultHeader(jwtService.sign({email})))
      .send({ password: defaultAdminPassword })
      .expect(200)
  });
});
