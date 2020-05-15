import { userCreateDtoMock } from '../../../test/mocks'

export default {
  _default: userCreateDtoMock,
  create: {
    valid: userCreateDtoMock,
    invalid: {
      email: {
        ...userCreateDtoMock,
        email: 'invalidemail'
      }
    }
  },
  setPassword: {
    valid: {
      email: 'admin@mail.com',
      password: '12345678'
    },
    invalid: {
      email: {
        email: 'invalidemail',
        password: '12345678'
      },
      password: {
        email: 'admin@mail.com',
        password: '1234567'
      },
      both: {
        email: 'invalidemail',
        password: '1234567'
      }
    }
  }
}