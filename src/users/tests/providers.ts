import { UsersService } from '../users.service'
import { MockRepository } from '../../../test/mocks/repository.mock'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userServiceProviders: any = [
  UsersService,
  {
    provide: 'UserEntityRepository',
    useClass: MockRepository
  },
  {
    provide: 'RoleEntityRepository',
    useClass: MockRepository
  }
]
