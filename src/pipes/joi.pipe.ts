import { PipeTransform, Injectable } from '@nestjs/common'
import { ObjectSchema } from '@hapi/joi'
import { JoiErrorHandling } from '../utils/error-handling'

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any): any {
    const { error } = this.schema.validate(value)
    if (error) {
      return JoiErrorHandling(error)
    }
    return value
  }
}