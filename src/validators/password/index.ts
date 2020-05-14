import * as Joi from '@hapi/joi'
import { emailSchema, passwordSchema } from '../global'

export const resetPasswordSchema = 
  Joi
    .object()
    .keys({
      email: emailSchema,
      password: passwordSchema
    })

export const requestResetPasswordSchema = 
    Joi
      .object()
      .keys({
        email: emailSchema
      })
