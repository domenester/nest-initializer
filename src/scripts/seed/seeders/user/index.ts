import { Connection } from 'typeorm'
import { UserEntity, RoleEntity } from '../../../../entities'
import { Seeder } from '../seeder'
import UserFaker from './faker'

export class UserSeed extends Seeder {
  constructor(
    private connection: Connection
  ) {
    super()
  }

  name = 'User'

  async setup (): Promise<void> {
    const roleRepository = this.connection.getRepository(RoleEntity)
    const roles = await roleRepository.find()
    const userFaked = UserFaker()
    const userRepository = this.connection.getRepository(UserEntity)
    await  Promise.all(
      userFaked.map(
        user => userRepository.save({
          ...user,
          roles: roles.filter(
            role => user.roles.includes(role.name)
          )
        })
      )
    ).catch(err => {
      console.log('Error seeding users: ', err)
    })
  }
  
}

export const userSeed = (
  connection: Connection
): UserSeed => new UserSeed(connection)