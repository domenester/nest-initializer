import { Repository } from "typeorm";
import { UsersService } from "../users.service";

export const userServiceProviders: any = [
  UsersService,
  {
    provide: 'UserEntityRepository',
    useClass: Repository,
  }
]
