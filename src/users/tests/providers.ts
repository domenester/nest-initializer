import { Repository } from 'typeorm'
import { UsersService } from '../users.service'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userServiceProviders: any = [
  UsersService,
  {
    provide: 'UserEntityRepository',
    useClass: Repository
  }
]
