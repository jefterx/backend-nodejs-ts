import { NextFunction, Request, Response } from 'express';

import { NewUserRequest, NewUserResponse } from '../interfaces/user.interface';
import { errorResponse, successResponse } from '../utils/response-formatter.utils';
import { validateSchema } from '../utils/validation.utils';
import { newUserSchema } from '../validations/auth.validation';

export const newUser = async (
    req: Request<{}, {}, NewUserRequest>,
    res: Response,
    next: NextFunction
  ): Promise<Response<NewUserResponse> | void> => {
    try {
        // Validar os parâmetros de entrada utilizando o schema de validação definido
        const { error, value } = validateSchema(newUserSchema, req.body);

        if (error) {
            errorResponse(res, "Dados de entrada inválidos", 400, error.details.map(e => e.message).join(', '));
            return;
        }

        return successResponse(res, {}, 'Usuário cadastrado com sucesso') as Response<NewUserResponse>;
      } catch (error) {
        // Em caso de erro, passar o erro para o middleware de tratamento de erros
        next(error);
      }
  }