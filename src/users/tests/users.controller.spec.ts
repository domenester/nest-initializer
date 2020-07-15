import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from '../users.controller'
import { userServiceProviders } from './providers'
import UserMocks from './mocks'
import { Repository } from 'typeorm'
import { UserEntity } from '../../entities'
import { getRepositoryToken } from '@nestjs/typeorm'
import { ConfigModuleForRoot } from '../../config/module.config'

describe('Users Controller', () => {
  let controller: UsersController
  let repository: Repository<UserEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ ConfigModuleForRoot() ],
      controllers: [ UsersController ],
      providers: [
        ...userServiceProviders
      ]
    }).compile()

    controller = module.get<UsersController>(UsersController)
    repository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity))
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create an user', async () => {
    const { create: { valid } } = UserMocks
    jest.spyOn(repository, 'save').mockResolvedValueOnce(valid as never)
    const userCreated = await controller.create(valid)
    const { password, ...rest } = valid
    expect(userCreated).toEqual({data: rest, message: 'Usuário criado com sucesso'})
  })

  it('should update an user', async () => {
    const { update: { valid } } = UserMocks
    jest.spyOn(repository, 'save').mockResolvedValueOnce([valid] as never)
    const userUpdated = await controller.update(valid)
    expect(userUpdated).toEqual({data: [valid], message: 'Usuário atualizado com sucesso'})
  })
})
