/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing'
import { userServiceProviders } from '../../users/tests/providers'
import { defaultAdmin } from '../../scripts/seed/seeders/user/faker'
import { Repository } from 'typeorm'
import { UserEntity } from '../../users/user.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { PasswordService } from '../password.service'
import { ConfigModule } from '@nestjs/config'
import { MailerModuleForRoot } from '../../app.module'

describe('Password Service', () => {
  let service: PasswordService
  let userRepository: Repository<UserEntity>
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
        }),
        MailerModuleForRoot
      ],
      providers: [
        PasswordService,
        ...userServiceProviders
      ],
    }).compile()

    service = module.get<PasswordService>(PasswordService)
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should send reset password link to valid email', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(defaultAdmin as never)
    const userValidated = await service.sendResetPasswordLink(
      defaultAdmin.email
    )
    expect(typeof userValidated.message).toBe('string')
  })
})
