import { BadRequestException } from "@nestjs/common"

export const JoiErrorHandling = (errors) => {
  const messages = errors.details.map( detail => detail.message)
  throw new BadRequestException(messages)
}