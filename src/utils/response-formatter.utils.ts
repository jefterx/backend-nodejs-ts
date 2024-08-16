import { Response } from 'express';

import { ErrorResponse, SuccessResponse } from '../interfaces/response.interface';

export const successResponse = <Data>(
  res: Response,
  data: Data,
  message: string = "Success"
): Response<SuccessResponse<Data>> => {
  return res.status(200).json({
    status: "success",
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  message: string,
  code: number = 400,
  errorDetails: any = null
): Response<ErrorResponse> => {
  return res.status(code).json({
    status: "error",
    message,
    errorDetails,
  });
};
