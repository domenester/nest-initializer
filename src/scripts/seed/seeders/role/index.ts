import { Connection } from 'typeorm'
import { Seeder } from '../seeder'
import { RoleEntity } from '../../../../entities'

export class RoleSeed extends Seeder {
  constructor(
    private connection: Connection
  ) {
    super()
  }

  name = 'Role'

  roles = [
    'owner',
    'admin',
    'user'
  ]

  async setup (): Promise<void> {
    const roleRepository = await this.connection.getRepository(RoleEntity)
    await  Promise.all(
      this.roles.map( name => roleRepository.save({ name }) )
    ).catch(err => {
      console.log(`Error seeding ${this.name}: `, err)
    })
  }
  
}

export const roleSeed = (
  connection: Connection
): RoleSeed => new RoleSeed(connection)