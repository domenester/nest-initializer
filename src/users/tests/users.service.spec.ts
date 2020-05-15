import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from '../users.service'
import UserMocks from './mocks'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserEntity } from '../../entities'
import { userServiceProviders } from './providers'
import { MockRepository } from '../../../test/mocks/repository.mock'
import { userCreateDtoMock } from '../../../test/mocks'

describe('Users Service Tests', () => {
  let service: UsersService
  let repository: MockRepository<UserEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ...userServiceProviders
      ]
    }).compile()

    service = module.get<UsersService>(UsersService)
    repository = module.get<MockRepository<UserEntity>>(getRepositoryToken(UserEntity))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create an user', async () => {
    jest.spyOn(repository, 'save').mockResolvedValueOnce([userCreateDtoMock] as never)
    const itemCreated = await service.create(userCreateDtoMock)
    expect(itemCreated).toEqual([userCreateDtoMock])
  })

  it('should get user by email', async () => {
    jest.spyOn(repository.queryBuilder, 'getOne').mockResolvedValueOnce(userCreateDtoMock as never)
    const userByEmail = await service.getByEmail(userCreateDtoMock.email)
    expect(userByEmail).toEqual(userCreateDtoMock)
  })

  it('should set user password', async () => {
    const { setPassword: { valid: { email, password } } } = UserMocks
    jest.spyOn(repository, 'update').mockResolvedValueOnce(true as never)
    const updated = await service.setPassword(email, password)
    expect(updated).toEqual(true)
  })

  it('should soft delete by email', async () => {
    const { _default } = UserMocks
    jest.spyOn(repository.queryBuilder, 'getOne').mockResolvedValueOnce(_default as never)
    jest.spyOn(repository, 'softDelete').mockResolvedValueOnce(_default as never)
    const deleted = await service.delete(_default.email)
    expect(!!deleted).toBe(true)
  })

  it('should restore by email', async () => {
    const { _default } = UserMocks
    jest.spyOn(repository.queryBuilder, 'getOne').mockResolvedValueOnce(_default as never)
    jest.spyOn(repository, 'restore').mockResolvedValueOnce(_default as never)
    const restored = await service.restore(_default.email)
    expect(!!restored).toBe(true)
  })
})
