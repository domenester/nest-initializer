import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from '../users.service'
import UserMocks from './mocks'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserEntity } from '../../entities'
import { userServiceProviders } from './providers'
import { MockRepository } from '../../../test/mocks/repository.mock'
import { userCreateDtoMock, userUpdateDtoMock } from '../../../test/mocks'
import { ConfigModuleForRoot } from '../../config/module.config'
import { ListModule } from '../../list/list.module'

describe('Users Service Tests', () => {
  let service: UsersService
  let repository: MockRepository<UserEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModuleForRoot(),
        ListModule
      ],
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
    jest.spyOn(repository, 'save').mockResolvedValueOnce(userCreateDtoMock as never)
    const itemCreated = await service.create(userCreateDtoMock)
    const { password, ...rest } = userCreateDtoMock
    expect(itemCreated).toEqual(rest)
  })

  it('should get user by email', async () => {
    jest.spyOn(repository.queryBuilder, 'getOne').mockResolvedValueOnce(userCreateDtoMock as never)
    const userByEmail = await service.getByEmail(userCreateDtoMock.email)
    expect(userByEmail).toEqual(userCreateDtoMock)
  })

  it('should list users', async () => {
    const { list: { valid } } = UserMocks
    const { password, ...rest } = userCreateDtoMock
    jest.spyOn(repository, 'findAndCount').mockResolvedValueOnce([[rest], 1])
    const list = await service.list({take: 10, skip: 0})
    expect(list).toEqual(valid)
  })

  it('should update user', async () => {
    jest.spyOn(repository, 'save').mockResolvedValueOnce([userUpdateDtoMock] as never)
    const userUpdated = await service.update(userUpdateDtoMock)
    expect(userUpdated).toEqual([userUpdateDtoMock])
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
    const deleted = await service.softDelete(_default.email)
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
