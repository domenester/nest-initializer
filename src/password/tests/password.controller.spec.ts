/* eslint-disable @typescript-eslint/camelcase */
import { Test, TestingModule } from '@nestjs/testing';
import { userServiceProviders } from '../../users/tests/providers';
import { ConfigModule } from '@nestjs/config';
import { MailerModuleForRoot } from '../../app.module';
import { PasswordService } from '../password.service';
import { PasswordController } from '../password.controller';
import { Repository } from 'typeorm';
import { UserEntity } from '../../users/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { defaultAdmin } from '../../scripts/seed/seeders/user/faker';
import UserMocks from '../../users/tests/mocks'

describe('Auth Controller', () => {
  let controller: PasswordController;
  let userRepository: Repository<UserEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
        }),
        MailerModuleForRoot
      ],
      controllers: [ PasswordController ],
      providers: [
        PasswordService,
        ...userServiceProviders
      ],
    }).compile()

    controller = module.get<PasswordController>(PasswordController);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity))
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should send reset password', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(defaultAdmin as never)
    const response = await controller.requestReset(
      { email: defaultAdmin.email }
    )
    expect(typeof response.message).toBe('string')
  });

  it('should reset password', async () => {
    const { setPassword: { valid: { email, password } } } = UserMocks
    const { create: { valid } } = UserMocks
    jest.spyOn(userRepository, 'update').mockResolvedValueOnce(true as never)
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(valid as never)
    const response = await controller.reset( { email, password } )
    expect(typeof response.message).toBe('string')
  });
});
