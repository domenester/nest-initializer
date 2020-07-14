import { userCreateDtoMock, userUpdateDtoMock } from '../../../test/mocks'

const { password, ...userCreateDtoMockWithoutPassword } = userCreateDtoMock

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
  update: {
    valid: userUpdateDtoMock
  },
  list: {
    valid: {
      count: 1,
      rows: [ userCreateDtoMockWithoutPassword ]
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