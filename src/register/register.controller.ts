import { Controller, HttpCode, Post, Body, BadRequestException } from '@nestjs/common'
import { MessageResponse } from '../interfaces'
import { UsersService } from '../users/users.service'

@Controller('register')
export class RegisterController {
  
  constructor(
    private userService: UsersService
  ) {}

  @HttpCode(200)
  @Post()
  async register(@Body() { email, password }): Promise<MessageResponse> {
    const isEmailRegistered = await this.userService.isEmailRegistered(email)
    if (isEmailRegistered) {
      throw new BadRequestException('Email already registered')
    }

    await this.userService.create({
      username: email, email, password, roles: ['user']
    })

    return { message: 'User registered successfuly' }
  }
}
