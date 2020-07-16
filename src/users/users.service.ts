import { Injectable, BadRequestException } from '@nestjs/common'
import { Repository, UpdateResult, In, Like } from 'typeorm'
import { UserEntity, RoleEntity } from '../entities'
import { InjectRepository } from '@nestjs/typeorm'
import {
  CreateUserDto,
  UpdateUserDto,
  ListDto
} from '../dtos'
import * as bcrypt from 'bcryptjs'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly configService: ConfigService
  ) {}

  async getByEmail(email: string): Promise<UserEntity> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where('user.email = :email', { email })
      .getOne()
  }

  async getByEmailWithDeleted(email: string): Promise<UserEntity> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where('user.email = :email', { email })
      .withDeleted()
      .getOne()
  }

  async isEmailRegistered(email: string): Promise<boolean> {
    const exists = await this.userRepository.findOne({ email })
    return !!exists
  }

  /**
   * TODO: Discover a way to get users excluding password field,
   * without map the query response
   */

  async list(options: ListDto): Promise<{
    rows: UserEntity[],
    count: number
  }> {
    const { filter } = options
    const take = this.configService.get<string>('PAGINATION')
    return this.userRepository.findAndCount({
      order: { email: 'ASC' },
      withDeleted: true,
      ...(
        filter && {
          where : [
            { name : Like(`%${filter}%`) },
            { email : Like(`%${filter}%`) },
            { username : Like(`%${filter}%`) }
          ]
        }
      ),
      take: options.take || +take,
      skip: options.skip || 0
    }).then(response => {
      return {
        rows: response[0].map( row => {
          const { password, ...result } = row
          return result
        }),
        count: response[1]
      }
    })
  }

  hashfyPassword(password: string): string {
    return bcrypt.hashSync(password, 10)
  }

  async setPassword(email: string, password: string): Promise<boolean> {
    const hash = this.hashfyPassword(password)
    const userUpdated = await this.userRepository.update(
      { email }, { password: hash }
    )
    return !!userUpdated
  }

  async create(user: CreateUserDto): Promise<UserEntity> {
    const roles = await this.roleRepository.find({
      where: { name: In(user.roles) }
    })

    const userCreated = await this.userRepository.save({
      ...user,
      password: this.hashfyPassword(user.password),
      roles
    }).catch((error) => {
      if (error.code === '23505') throw new BadRequestException('User already registered')
      return error
    })
    const { password, ...rest } = userCreated
    return rest
  }

  async update(user: UpdateUserDto): Promise<UserEntity> {
    let roles: RoleEntity[] = []
    if (user.roles) {
      roles = await this.roleRepository.find({
        where: { name: In(user.roles) }
      })
    }
    const newUser = { ...user, ...(roles.length && { roles }) }
    return this.userRepository.save({ ...newUser })
  }

  async delete(email: string): Promise<UpdateResult> {
    const userByEmail = await this.getByEmailWithDeleted(email)
    if (!userByEmail) {
      throw new BadRequestException('Email não encontrado')
    }
    return this.userRepository.softDelete(userByEmail.id)
  }

  async restore(email: string): Promise<UpdateResult> {
    const userByEmail = await this.getByEmailWithDeleted(email)
    if (!userByEmail) {
      throw new BadRequestException('Email não encontrado')
    }
    return this.userRepository.restore(userByEmail.id)
  }
}