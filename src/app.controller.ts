import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { JwtAuthGuard } from './auth/strategies/jwt-auth.guard'
import { UserEntity } from './entities'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): UserEntity {
    return req.user
  }
}
