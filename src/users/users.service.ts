import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos';
import * as bcrypt from 'bcrypt';

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

  async setPassword(email: string, password: string): Promise<boolean> {
    const hash = bcrypt.hashSync(password, 10)
    const userUpdated = await this.userRepository.update(
      { email }, { password: hash }
    );
    return !!userUpdated
  }

  async create(user: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.create({...user, username: user.email})
  }

  async delete(email: string): Promise<UpdateResult> {
    const userByEmail = await this.getByEmail(email)
    return this.userRepository.softDelete(userByEmail.id)
  }

  async restore(email: string): Promise<UpdateResult> {
    const userByEmail = await this.getByEmail(email)
    return this.userRepository.restore(userByEmail.id)
  }
}