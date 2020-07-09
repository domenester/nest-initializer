/* eslint-disable @typescript-eslint/camelcase */
import { Test, TestingModule } from '@nestjs/testing'
import { userServiceProviders } from '../../users/tests/providers'
import { UserEntity } from '../../entities'
import { getRepositoryToken } from '@nestjs/typeorm'
import { MockRepository } from '../../../test/mocks/repository.mock'
import { RegisterController } from '../register.controller'
import { ConfigModuleForRoot } from '../../app.module'

describe('Auth Controller', () => {
  let controller: RegisterController
  let userRepository: MockRepository<UserEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ ConfigModuleForRoot ],
      controllers: [ RegisterController ],
      providers: [
        ...userServiceProviders
      ]
    }).compile()

    controller = module.get<RegisterController>(RegisterController)
    userRepository = module.get<MockRepository<UserEntity>>(getRepositoryToken(UserEntity))
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should register user', async () => {
    const userToRegister = { email: 'admin2@mail.com', password: '12345678' }
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined as never)
    jest.spyOn(userRepository, 'save').mockResolvedValueOnce(userToRegister as never)
    const response = await controller.register(
      { email: userToRegister.email, password: userToRegister.email }
    )
    expect(typeof response.message).toBe('string')
  })
})
