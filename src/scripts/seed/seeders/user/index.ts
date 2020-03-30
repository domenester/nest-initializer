import { Connection } from "typeorm";
import { UserEntity } from "../../../../users/user.entity";
import { Seeder } from "../seeder";
import * as bcrypt from 'bcrypt';

export class UserSeed extends Seeder{
  constructor(
    private connection: Connection
  ) {
    super()
  }

  name: string = 'User'

  async setup () {
    const password = '1234'
    const hash = bcrypt.hashSync(password, 10);
    const user = new UserEntity()
    user.email = 'user@mocked.com'
    user.password = hash
    user.username = user.email
    const userRepository = await this.connection.getRepository(UserEntity)
    await userRepository.save(user)
  }
  
}

export const userSeed = (
  connection: Connection
) => new UserSeed(connection)