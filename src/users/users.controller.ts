import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import { CreateUserDto } from '../interfaces';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Post('delete')
  async delete(@Body() body) {
    return this.userService.delete(body.email);
  }
}
