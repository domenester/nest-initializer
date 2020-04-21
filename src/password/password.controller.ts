import { Controller, Post, Request, HttpCode, BadRequestException } from '@nestjs/common';
import { PasswordService } from './password.service';
import { UsersService } from '../users/users.service';

@Controller('password')
export class PasswordController {

  constructor(
    private passwordService: PasswordService,
    private usersService: UsersService
  ) {}

  @HttpCode(200)
  @Post('request-reset')
  async requestReset(@Request() { body: { email } }) {
    const userByEmail = await this.usersService.getByEmail(email)
    if (!userByEmail) throw new BadRequestException('Email not found')
    return this.passwordService.sendResetPasswordLink(email)
  }

  @HttpCode(200)
  @Post('reset')
  async reset(@Request() { body: { email, password } }) {
    const userByEmail = await this.usersService.getByEmail(email)
    if (!userByEmail) throw new BadRequestException('Email not found')
    return this.passwordService.resetPassword(email, password)
  }
}
