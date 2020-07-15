/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from '../auth.service'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../constants'
import { userServiceProviders } from '../../users/tests/providers'
import { defaultAdmin, defaultAdminPassword } from '../../scripts/seed/seeders/user/faker'
import { UserEntity } from '../../entities'
import { getRepositoryToken } from '@nestjs/typeorm'
import { userEntityMock } from '../../../test/mocks/default.mock'
import * as bcrypt from 'bcryptjs'
import { MockRepository } from '../../../test/mocks/repository.mock'
import { ConfigModuleForRoot } from '../../config/module.config'

/**
 * TODO: Implement auth.service tests
 */

describe('Auth Service', () => {
  let service: AuthService
  let userRepository: MockRepository<UserEntity>
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' }
        }),
        ConfigModuleForRoot()
      ],
      providers: [
        AuthService,
        ...userServiceProviders
      ]
    }).compile()

    service = module.get<AuthService>(AuthService)
    userRepository = module.get<MockRepository<UserEntity>>(getRepositoryToken(UserEntity))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should validate user', async () => {
    jest.spyOn(userRepository.queryBuilder, 'getOne')
      .mockResolvedValueOnce({
        ...userEntityMock, password: bcrypt.hashSync(userEntityMock.password, 10)
      } as never)
    const userValidated = await service.validateUser(
      defaultAdmin.email, defaultAdminPassword
    )
    expect(userValidated.password).toBeUndefined()
    expect(userValidated.email).toEqual(defaultAdmin.email)
  })

  it('should login user', async () => {
    const userLogged = await service.login(userEntityMock)
    const { access_token, user } = userLogged
    expect(access_token).toBeDefined()
    expect(user.email).toEqual(userEntityMock.email)
  })
})
