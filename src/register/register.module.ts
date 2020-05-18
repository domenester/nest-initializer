import { Module } from '@nestjs/common'
import { RegisterController } from './register.controller'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [UsersModule],
  controllers: [RegisterController]
})
export class RegisterModule {}
