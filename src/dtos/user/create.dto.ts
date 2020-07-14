import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(8)
  password: string

  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  name: string

  @IsOptional()
  roles?: string[]
}