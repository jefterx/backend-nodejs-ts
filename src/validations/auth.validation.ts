import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const newUserSchema = Joi.object({
  name: Joi.string().min(3).required(),
});