import { Controller, Post, Request, HttpCode, BadRequestException, UsePipes, Body } from '@nestjs/common';
import { PasswordService } from './password.service';
import { UsersService } from '../users/users.service';
import { JoiValidationPipe } from '../pipes/joi.pipe';
import { resetPasswordSchema } from '../validators';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ResetPasswordDto } from '../dtos';

@Controller('password')
export class PasswordController {

  constructor(
    private passwordService: PasswordService,
    private usersService: UsersService
  ) {}

  @HttpCode(200)
  @Post('request-reset')
  async requestReset(@Body() { email }) {
    const userByEmail = await this.usersService.getByEmail(email)
    if (!userByEmail) throw new BadRequestException('Email not found')
    return this.passwordService.sendResetPasswordLink(email)
  }

  @HttpCode(200)
  @Post('reset')
  @UsePipes(new ValidationPipe())
  async reset(@Body() { email, password }: ResetPasswordDto) {
    const userByEmail = await this.usersService.getByEmail(email)
    if (!userByEmail) throw new BadRequestException('Email not found')
    return this.passwordService.resetPassword(email, password)
  }
}
