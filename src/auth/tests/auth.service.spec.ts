/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from '../auth.service'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../constants'
import { userServiceProviders } from '../../users/tests/providers'
import { defaultAdmin, defaultAdminPassword } from '../../scripts/seed/seeders/user/faker'
import { Repository } from 'typeorm'
import { UserEntity } from '../../users/user.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { loginMock } from './mocks'

/**
 * TODO: Implement auth.service tests
 */

describe('Auth Service', () => {
  let service: AuthService
  let userRepository: Repository<UserEntity>
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [
        AuthService,
        ...userServiceProviders
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should validate user', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(defaultAdmin as never)
    const userValidated = await service.validateUser(
      defaultAdmin.email, defaultAdminPassword
    )
    expect(userValidated.password).toBeUndefined()
    expect(userValidated.email).toEqual(defaultAdmin.email)
  })

  it('should login user', async () => {
    const userLogged = await service.login(loginMock)
    expect(userLogged.access_token).toBeDefined()
    // eslint-disable-next-line
    const { access_token, ...userEntity } = userLogged
    expect(userEntity).toEqual(loginMock)
  })
})
