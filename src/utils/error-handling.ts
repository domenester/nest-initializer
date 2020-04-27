import { BadRequestException } from "@nestjs/common"

export const JoiErrorHandling = (errors) => {
  const messages = errors.details.map(
    (detail, index) => {
      if (index === errors.details.length) {
        return `${detail.message}.`
      }
      return `${detail.message}, `
    }
  )
  throw new BadRequestException(errors, messages)
}