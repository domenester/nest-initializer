import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator'
import { RoleEntity } from '../../entities';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  username: string;

  @IsOptional()
  roles?: RoleEntity[]
}