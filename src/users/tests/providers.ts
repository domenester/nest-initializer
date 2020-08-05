import { UsersService } from '../users.service'
import { MockRepository } from '../../../test/mocks/repository.mock'
import { ListService } from '../../list/list.service'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userServiceProviders: any = [
  UsersService,
  ListService,
  {
    provide: 'UserEntityRepository',
    useClass: MockRepository
  },
  {
    provide: 'RoleEntityRepository',
    useClass: MockRepository
  }
]
