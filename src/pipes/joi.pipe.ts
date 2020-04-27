import { PipeTransform, Injectable } from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';
import { JoiErrorHandling } from '../utils/error-handling';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value)
    if (error) {
      return JoiErrorHandling(error)
    }
    return value;
  }
}