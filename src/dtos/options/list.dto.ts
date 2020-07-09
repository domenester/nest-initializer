import { Min, Max } from 'class-validator'

export class ListDto {
  @Min(0)
  @Max(50)
  take: number

  @Min(0)
  skip: number
}