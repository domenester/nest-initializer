import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import UserMocks from './mocks';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../entities';
import { Repository } from 'typeorm';
import { userServiceProviders } from './providers'

describe('Users Service Tests', () => {
  let service: UsersService;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ...userServiceProviders
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an user', async () => {
    const { create: { valid } } = UserMocks
    jest.spyOn(repository, 'create').mockResolvedValueOnce([valid] as never);
    const itemCreated = await service.create(valid);
    expect(itemCreated).toEqual([valid]);
  });

  it('should get user by email', async () => {
    const { _default } = UserMocks
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(_default as never);
    const userByEmail = await service.getByEmail(_default.email)
    expect(userByEmail).toEqual(_default);
  });

  it('should set user password', async () => {
    const { setPassword: { valid: { email, password } } } = UserMocks
    jest.spyOn(repository, 'update').mockResolvedValueOnce(true as never);
    const updated = await service.setPassword(email, password);
    expect(updated).toEqual(true);
  });

  it('should soft delete by email', async () => {
    const { _default } = UserMocks
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(_default as never);
    jest.spyOn(repository, 'softDelete').mockResolvedValueOnce(_default as never);
    const deleted = await service.delete(_default.email)
    expect(!!deleted).toBe(true)
  });

  it('should restore by email', async () => {
    const { _default } = UserMocks
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(_default as never);
    jest.spyOn(repository, 'restore').mockResolvedValueOnce(_default as never);
    const restored = await service.restore(_default.email)
    expect(!!restored).toBe(true)
  });
});
