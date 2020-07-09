import { Injectable, BadRequestException } from '@nestjs/common'
import { Repository, UpdateResult, In } from 'typeorm'
import { UserEntity, RoleEntity } from '../entities'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDto, ListDto } from '../dtos'
import * as bcrypt from 'bcrypt'
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
    const take = this.configService.get<string>('PAGINATION')
    return this.userRepository.findAndCount({
      order: { email: 'ASC' },
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

  async setPassword(email: string, password: string): Promise<boolean> {
    const hash = bcrypt.hashSync(password, 10)
    const userUpdated = await this.userRepository.update(
      { email }, { password: hash }
    )
    return !!userUpdated
  }

  async create(user: CreateUserDto): Promise<UserEntity> {
    const roles = await this.roleRepository.find({
      where: { name: In(user.roles) }
    })
    return this.userRepository.save({...user, roles })
      .catch((error) => {
        if (error.code === '23505') throw new BadRequestException('User already registered')
        return error
      })
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