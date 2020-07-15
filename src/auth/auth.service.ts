import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { UserEntity } from '../entities'
import { AuthLoginResponse } from '../interfaces'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    try {
      const user = await this.usersService.getByEmail(email)
      if (!user) { return }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (user && validPassword) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user
        return result
      }
    } catch (err) {
      console.log('ERROR VALIDATING USER: ', err)
      throw new InternalServerErrorException(err, 'Erro ao validar usuário')
    }
  }

  async login(user: UserEntity): Promise<AuthLoginResponse> {
    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles
    }

    return {
      user,
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload)
    }
  }
}

