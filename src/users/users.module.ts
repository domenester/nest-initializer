import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UserEntity, RoleEntity } from '../entities'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersController } from './users.controller'
import { ConfigModule } from '@nestjs/config'

export const userModuleImports = [
  ConfigModule.forRoot({
    envFilePath: '.env'
  }),
  TypeOrmModule.forFeature([
    UserEntity,
    RoleEntity
  ])
]

@Module({
  imports: userModuleImports,
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}