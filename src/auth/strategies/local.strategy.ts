import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { UserEntity } from '../../entities'
import { Logger } from '../../logger/logger.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger()
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email'
    })
  }

  async validate(email: string, password: string): Promise<UserEntity> {
    const user = await this.authService.validateUser(email, password)
    if (!user) {
      const message = 'Credenciais inválida'
      this.logger.error(message, email)
      throw new UnauthorizedException(message)
    }
    return user
  }
}