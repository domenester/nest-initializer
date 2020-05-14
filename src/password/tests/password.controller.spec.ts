/* eslint-disable @typescript-eslint/camelcase */
import { Test, TestingModule } from '@nestjs/testing';
import { userServiceProviders } from '../../users/tests/providers';
import { ConfigModule } from '@nestjs/config';
import { MailerModuleForRoot } from '../../app.module';
import { PasswordService } from '../password.service';
import { PasswordController } from '../password.controller';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { defaultAdmin } from '../../scripts/seed/seeders/user/faker';
import UserMocks from '../../users/tests/mocks'
import { JwtModuleRegister } from '../password.module';
import { JwtService } from '@nestjs/jwt';

describe('Auth Controller', () => {
  let controller: PasswordController;
  let userRepository: Repository<UserEntity>
  let jwtService: JwtService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
        }),
        MailerModuleForRoot,
        JwtModuleRegister
      ],
      controllers: [ PasswordController ],
      providers: [
        PasswordService,
        ...userServiceProviders
      ],
    }).compile()

    controller = module.get<PasswordController>(PasswordController);
    jwtService = module.get<JwtService>(JwtService);
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
    const response = await controller.reset(
      { password },
      { authorization: jwtService.sign({ email }) }
    )
    expect(typeof response.message).toBe('string')
  });
});
