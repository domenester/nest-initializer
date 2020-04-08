import { defaultAdmin, defaultAdminPassword } from "../../src/scripts/seed/seeders/user/faker";

export const AuthMocks = {
  authLogin: {
    invalid: {
      email: {
        email: 'invalidmail',
        password: '1234'
      }
    },
    valid: {
      email: defaultAdmin.email,
      password: defaultAdminPassword
    }
  }
}