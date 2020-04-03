import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import UserMocks from './mocks';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
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
});
