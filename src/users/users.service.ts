import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserEntity, IUser } from 'src/interfaces';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getByEmail(email: string): Promise<IUserEntity> {
    return this.userRepository.findOne({
      where: { email }, order: { updatedAt: 'DESC' },
    });
  }

  async create(user: IUser): Promise<IUserEntity> {
    return this.userRepository.create(user);
  }
}