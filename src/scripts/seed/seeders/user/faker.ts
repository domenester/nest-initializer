import * as faker from 'faker'
import { CreateUserDto } from '../../../../dtos'
import * as bcrypt from 'bcrypt'
import { RoleEntity } from '../../../../entities'

export const defaultAdminPassword = '12345678'

export const defaultAdmin = {
  username: 'admin',
  password: defaultAdminPassword,
  email: 'admin@mail.com'
}

export default (
  roles: Array<RoleEntity>
): Array<CreateUserDto> => {
  const usersFake: Array<CreateUserDto> = [{
    ...defaultAdmin,
    password: bcrypt.hashSync(defaultAdmin.password, 10),
    roles: [roles.find( role => role.name === 'owner' )]
   }]

  for (let i = 0; i < +process.env.FAKER_LENGTH - 1; i++) {
    const name = faker.name.findName()
    const nameSplit = name.toLowerCase().split(' ')
    const password = faker.internet.password(8)
    const hash = bcrypt.hashSync(password, 10)
    usersFake.push({
      username: `${nameSplit[0]}.${nameSplit[1]}`,
      password: hash,
      email: faker.internet.email(nameSplit[0], nameSplit[1]),
      roles: [roles.find( role => role.name === 'user' )]
    })
  }

  return usersFake
}