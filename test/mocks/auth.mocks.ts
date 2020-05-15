import { userEntityMock } from './default.mock'

export const AuthMocks = {
  authLogin: {
    invalid: {
      email: {
        email: 'invalidmail',
        password: '1234'
      }
    },
    valid: {
      email: userEntityMock.email,
      password: userEntityMock.password
    }
  }
}