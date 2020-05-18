import { userEntityMock } from './default.mock'

export const RegisterMocks = {
  register: {
    invalid: {
      email: {
        email: 'invalidmail',
        password: '1234'
      },
      emailRegistered: {
        email: userEntityMock.email,
        password: userEntityMock.password
      }
    },
    valid: {
      email: 'admin2@mail.com',
      password: '12345678'
    }
  }
}