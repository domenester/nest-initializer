import { Min, Max, IsOptional } from 'class-validator'

type TFilterRangeField = 'createdAt' | 'updatedAt' | 'deletedAt'

export interface ListFilter {
  search?: string
  range?: {
    field: TFilterRangeField,
    from: Date,
    to: Date
  }
}

export class ListDto {
  @Min(0)
  @Max(50)
  take: number

  @Min(0)
  skip: number

  @IsOptional()
  filter?: ListFilter
}