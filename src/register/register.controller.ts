import { Controller, HttpCode, Post, Body, BadRequestException } from '@nestjs/common'
import { ApiResponse } from '../interfaces'
import { UsersService } from '../users/users.service'

@Controller('register')
export class RegisterController {
  
  constructor(
    private userService: UsersService
  ) {}

  @HttpCode(200)
  @Post()
  async register(@Body() { email, password }): Promise<ApiResponse> {
    const isEmailRegistered = await this.userService.isEmailRegistered(email)
    if (isEmailRegistered) {
      throw new BadRequestException('Email already registered')
    }

    await this.userService.create({
      username: email,
      email,
      password,
      roles: ['user'],
      name: email
    })

    return { message: 'User registered successfuly' }
  }
}
