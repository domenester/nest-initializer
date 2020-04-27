export default {
  _default: {
    username: 'username',
    password: '1234',
    email: 'user@mail.com'
  },
  create: {
    valid: {
      username: 'username',
      password: '1234',
      email: 'user@mail.com'
    },
    invalid: {
      email: {
        username: 'username',
        password: '12345678',
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