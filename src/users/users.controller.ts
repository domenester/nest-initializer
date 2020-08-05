import { Body, Controller, Post, UseGuards, UsePipes, Put } from '@nestjs/common'
import { UsersService } from './users.service'
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard'
import { CreateUserDto, ListDto, UpdateUserDto } from '../dtos'
import { ValidationPipe } from '../pipes/validation.pipe'
import { UserEntity } from '../entities'
import { Roles } from '../decorator/roles.decorator'
import { RolesGuard } from '../guard/roles.guard'
import { ApiResponse } from '../interfaces'

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService
  ) {}

  @Roles('owner')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Body() body: CreateUserDto): Promise<ApiResponse> {
    const userCreated = await this.userService.create(body)
    return {
      message: 'Usuário criado com sucesso',
      data: userCreated
    }
  }

  @Roles('owner')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('update')
  @UsePipes(new ValidationPipe())
  async update(@Body() body: UpdateUserDto): Promise<ApiResponse> {
    const userUpdated = await this.userService.update(body)
    return {
      message: 'Usuário atualizado com sucesso',
      data: userUpdated
    }
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

  @Roles('owner')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('remove')
  async remove(@Body() body): Promise<ApiResponse> {
    await this.userService.delete(body.email)
    return {
      message: 'Usuário deletado com sucesso'
    }
  }

  @Roles('owner')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('delete')
  async delete(@Body() body): Promise<ApiResponse> {
    await this.userService.softDelete(body.email)
    return {
      message: 'Usuário desabilitado com sucesso'
    }
  }

  @Roles('owner')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('restore')
  async restore(@Body() body): Promise<ApiResponse> {
    await this.userService.restore(body.email)
    return {
      message: 'Usuário habilitado com sucesso'
    }
  }
}
