import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../interfaces';
import * as bcrypt from 'bcrypt';
import { getByEmailSchema, setPasswordSchema } from '../validators/user';
import { JoiErrorHandling } from '../utils/error-handling';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getByEmail(email: string): Promise<UserEntity> {
    await getByEmailSchema
      .validateAsync(email)
      .catch( errors => JoiErrorHandling(errors))

    return this.userRepository.findOne({
      where: { email }, order: { updatedAt: 'DESC' },
    });
  }

  async setPassword(email: string, password: string): Promise<boolean> {
    await setPasswordSchema
      .validateAsync({ email, password })
      .catch( errors => JoiErrorHandling(errors))

    const hash = bcrypt.hashSync(password, 10)
    const userUpdated = await this.userRepository.update(
      { email }, { password: hash }
    );
    return !!userUpdated
  }

  @UsePipes(new ValidationPipe())
  async create(user: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.create(user);
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