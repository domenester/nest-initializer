import { IsEmail, Min } from 'class-validator';

export class SetPasswordDto {
  @IsEmail()
  email: string;

  @Min(8)
  password: string;
}