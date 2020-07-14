import { MinLength, IsOptional, Min, IsNotEmpty } from 'class-validator'

export class UpdateUserDto {
  @IsNotEmpty()
  @Min(1)
  id: number

  @IsOptional()
  email?: string

  @IsOptional()
  @MinLength(8)
  password?: string

  @IsOptional()
  username?: string

  @IsOptional()
  name?: string

  @IsOptional()
  roles?: string[]
}