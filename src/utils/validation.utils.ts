import { ObjectSchema } from "joi";

export const validateSchema = <T>(schema: ObjectSchema, data: T) => {
  const { error, value } = schema.validate(data, { abortEarly: false });
  return { error, value: value as T };
};
