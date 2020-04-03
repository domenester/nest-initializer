import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/interfaces';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { email }, order: { updatedAt: 'DESC' },
    });
  }

  async create(user: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.create(user);
  }
}