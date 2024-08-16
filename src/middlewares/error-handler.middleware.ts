import { NextFunction, Request, Response } from "express";

import { errorResponse } from "../utils/response-formatter.utils";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  let message = "Erro interno do servidor";
  let statusCode = 500;

  if (err instanceof Error) {
    message = err.message;
  } else if (typeof err === 'string') {
    message = err;
  }

  errorResponse(res, message, statusCode, message);
  return;
};
