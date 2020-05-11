import {
  Controller,
  Post,
  HttpCode,
  BadRequestException,
  UsePipes,
  Body,
  UseGuards,
  Headers
} from '@nestjs/common';
import { PasswordService } from './password.service';
import { UsersService } from '../users/users.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ResetPasswordDto } from '../dtos';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { requestResetPasswordSchema } from '../validators';
import { JoiErrorHandling } from '../utils/error-handling';

@Controller('password')
export class PasswordController {

  constructor(
    private passwordService: PasswordService,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  @HttpCode(200)
  @Post('request-reset')
  async requestReset(@Body() { email }) {
    await requestResetPasswordSchema
      .validateAsync({ email })
      .catch( errors => JoiErrorHandling(errors))

    const userByEmail = await this.usersService.getByEmail(email)
    if (!userByEmail) throw new BadRequestException('Email not found')
    return this.passwordService.sendResetPasswordLink(email)
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('reset')
  @UsePipes(new ValidationPipe())
  async reset(
    @Body() { password }: ResetPasswordDto,
    @Headers() { authorization }
  ) {
    const token = authorization.replace('Bearer ', '');
    const { email } = this.jwtService.verify(token)
    const userByEmail = await this.usersService.getByEmail(email)
    if (!userByEmail) throw new BadRequestException('Email not found')
    return this.passwordService.resetPassword(email, password)
  }
}
