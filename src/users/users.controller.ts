import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common'
import { UsersService } from './users.service'
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard'
import { CreateUserDto, ListDto } from '../dtos'
import { ValidationPipe } from '../pipes/validation.pipe'
import { UserEntity } from '../entities'
import { UpdateResult } from 'typeorm'
import { Roles } from '../decorator/roles.decorator'
import { RolesGuard } from '../guard/roles.guard'

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService
  ) {}

  @Roles('owner')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Body() body: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(body)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('list')
  @UsePipes(new ValidationPipe())
  async list(@Body() body?: ListDto): Promise<{
    rows: UserEntity[],
    count: number
  }> {
    return this.userService.list(body)
  }

  @Post('delete')
  async delete(@Body() body): Promise<UpdateResult> {
    return this.userService.delete(body.email)
  }
}
