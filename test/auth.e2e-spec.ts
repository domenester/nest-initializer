/* eslint-disable @typescript-eslint/camelcase */
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { AuthMocks } from './mocks'

describe('AuthController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(AuthMocks.authLogin.valid)
      .expect(200)
      .then( response => {
        const { access_token, user } = response.body
        const { email } = AuthMocks.authLogin.valid
        expect(typeof access_token).toBe('string')
        expect(user.email).toBe(email)
      })
  })
})
