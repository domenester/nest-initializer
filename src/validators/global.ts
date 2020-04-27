import * as Joi from "@hapi/joi";

export const emailSchema =
  Joi
    .string()
    .email()
    .messages({
      'string.email': 'Invalid Email'
    })

export const passwordSchema =
    Joi
      .string()
      .min(8)
      .messages({
        'string.min': 'Password min length is 8'
      })