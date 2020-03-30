import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Request() req) {
    return this.userService.create(req.body);
  }
}
