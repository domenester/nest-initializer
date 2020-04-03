import * as faker from 'faker';
import { CreateUserDto } from '../../../../interfaces';
import * as bcrypt from 'bcrypt';

export default (): Array<CreateUserDto> => {
  const usersFake: Array<CreateUserDto> = [
    {
      username: 'admin',
      password: bcrypt.hashSync('admin', 10),
      email: 'admin@mail.com'
    }
  ]

  for (let i = 0; i < +process.env.FAKER_LENGTH - 1; i++) {
    const name = faker.name.findName()
    const nameSplit = name.toLowerCase().split(' ')
    const password = faker.internet.password(8)
    const hash = bcrypt.hashSync(password, 10);
    usersFake.push({
      username: `${nameSplit[0]}.${nameSplit[1]}`,
      password: hash,
      email: faker.internet.email(nameSplit[0], nameSplit[1])
    })
  }

  return usersFake
}