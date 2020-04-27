import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class EmailRegisteredPipe implements PipeTransform<any> {
  constructor(
    private usersService: UsersService
  ) {}

  async transform(value: any) {
    console.log('value: ', value);
    const userByEmail = await this.usersService.getByEmail(value.email)
    if (!userByEmail) throw new BadRequestException('Email not found')
    return value;
  }
}