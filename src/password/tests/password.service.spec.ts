/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing'
import { userServiceProviders } from '../../users/tests/providers'
import { defaultAdmin } from '../../scripts/seed/seeders/user/faker'
import { Repository } from 'typeorm'
import { UserEntity } from '../../entities'
import { getRepositoryToken } from '@nestjs/typeorm'
import { PasswordService } from '../password.service'
import { ConfigModule } from '@nestjs/config'
import { MailerModuleForRoot } from '../../app.module'
import UserMocks from '../../users/tests/mocks'
import { JwtModuleRegister } from '../password.module'

describe('Password Service', () => {
  let service: PasswordService
  let userRepository: Repository<UserEntity>
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env'
        }),
        MailerModuleForRoot,
        JwtModuleRegister
      ],
      providers: [
        PasswordService,
        ...userServiceProviders
      ]
    }).compile()

    service = module.get<PasswordService>(PasswordService)
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should send reset password link', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(defaultAdmin as never)
    const userValidated = await service.sendResetPasswordLink(
      defaultAdmin.email
    )
    expect(typeof userValidated.message).toBe('string')
  })

  it('should reset password', async () => {
    const { setPassword: { valid: { email, password } } } = UserMocks
    jest.spyOn(userRepository, 'update').mockResolvedValueOnce(true as never)
    const response = await service.resetPassword(email, password)
    expect(response.message).toBeDefined()
  })
})
