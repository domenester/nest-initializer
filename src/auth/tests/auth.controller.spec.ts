import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { userServiceProviders } from '../../users/tests/providers';
import { AuthService } from '../auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { loginMock } from './mocks';

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      controllers: [ AuthController ],
      providers: [
        AuthService,
        ...userServiceProviders
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login user', async () => {
    const userLogged = await controller.login({ user: loginMock })
    expect(userLogged.access_token).toBeDefined()
    // eslint-disable-next-line
    const { access_token, ...userEntity } = userLogged
    expect(userEntity).toEqual(loginMock)
  });
});
