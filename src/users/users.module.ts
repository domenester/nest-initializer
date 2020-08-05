import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UserEntity, RoleEntity } from '../entities'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersController } from './users.controller'
import { ConfigModuleForRoot } from '../config/module.config'
import { ListModule } from '../list/list.module'

export const userModuleImports = [
  ConfigModuleForRoot(),
  TypeOrmModule.forFeature([
    UserEntity,
    RoleEntity
  ]),
  ListModule
]

@Module({
  imports: userModuleImports,
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}