import { Controller, UseGuards, Post, Request } from '@nestjs/common';
import { LocalAuthGuard } from './strategies/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ){}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() { user }) {
    return this.authService.login(user);
  }
}
