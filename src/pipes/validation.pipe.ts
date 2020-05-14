/* eslint-disable @typescript-eslint/no-explicit-any */
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(
    value: any,
    { metatype }: ArgumentMetadata
  ): Promise<any> {
    const object = plainToClass(metatype, value)
    const errors = await validate(object)
    if (errors.length > 0) {
      const messages = errors.map(
        error => Object.keys(error.constraints).map(
          key => error.constraints[key]
        )
      )
      throw new BadRequestException(messages[0])
    }
    return value
  }
}