/* eslint-disable @typescript-eslint/camelcase */
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { RegisterMocks } from './mocks'

describe('RegisterController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll( async () => {
    // TODO: delete user registered in test
  })

  it.skip('/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/register')
      .send(RegisterMocks.register.valid)
      .expect(200)
      .then( response => {
        const { message } = response.body
        expect(typeof message).toBe('string')
      })
  })
})
