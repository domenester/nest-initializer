import * as Joi from "@hapi/joi";
import { emailSchema, passwordSchema } from "../global";

export const getByEmailSchema = emailSchema

export const setPasswordSchema = 
  Joi
    .object()
    .keys({
      email: emailSchema,
      password: passwordSchema
    })
