import {
  Controller,
  Post,
  HttpCode,
  BadRequestException,
  UsePipes,
  Body,
  UseGuards,
  Headers
} from '@nestjs/common'
import { PasswordService } from './password.service'
import { UsersService } from '../users/users.service'
import { ValidationPipe } from '../pipes/validation.pipe'
import { ResetPasswordDto, RequestResetPasswordDto } from '../dtos'
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard'
import { JwtService } from '@nestjs/jwt'
import { ApiResponse } from '../interfaces'

@Controller('password')
export class PasswordController {

  constructor(
    private passwordService: PasswordService,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  @HttpCode(200)
  @Post('request-reset')
  @UsePipes(new ValidationPipe())
  async requestReset(
    @Body() { email }: RequestResetPasswordDto
  ): Promise<ApiResponse> {
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
  ): Promise<ApiResponse> {
    const token = authorization.replace('Bearer ', '')
    const { email } = this.jwtService.verify(token)
    const userByEmail = await this.usersService.getByEmail(email)
    if (!userByEmail) throw new BadRequestException('Email not found')
    return this.passwordService.resetPassword(email, password)
  }
}
