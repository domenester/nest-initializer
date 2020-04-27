import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import { CreateUserDto } from '../dtos';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Post('delete')
  async delete(@Body() body) {
    return this.userService.delete(body.email);
  }
}
