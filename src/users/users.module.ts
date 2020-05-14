import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from '../entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}