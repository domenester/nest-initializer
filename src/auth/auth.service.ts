import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser, IUserEntity } from '../interfaces';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<IUserEntity> {
    const user = await this.usersService.getByEmail(username);
    const validPassword = bcrypt.compareSync(password, user.password);
    if (user && validPassword) {
      const { password, ...result } = user;
      return result;
    }
  }

  async login(user: IUser) {
    const payload = { username: user.username, sub: user.id };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }
}

