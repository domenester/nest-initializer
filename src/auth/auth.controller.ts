import { Controller, UseGuards, Post, Request, HttpCode } from '@nestjs/common'
import { LocalAuthGuard } from './strategies/local-auth.guard'
import { AuthService } from './auth.service'
import { IAuthLoginResponse } from '../interfaces'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ){}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Request() { user }): Promise<IAuthLoginResponse> {
    return this.authService.login(user)
  }
}
