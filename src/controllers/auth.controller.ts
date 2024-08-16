import { NextFunction, Request, Response } from 'express';

import { LoginUserRequest, LoginUserResponse } from '../interfaces/auth.interface';
import { verifyUserCredentials } from '../services/auth.service';
import { generateToken } from '../services/token.service';
import { errorResponse, successResponse } from '../utils/response-formatter.utils';
import { validateSchema } from '../utils/validation.utils';
import { loginSchema } from '../validations/auth.validation';

// Função para autenticar o usuário e retornar um token JWT
export const loginUser = async (
  req: Request<{}, {}, LoginUserRequest>,
  res: Response,
  next: NextFunction
): Promise<Response<LoginUserResponse> | void> => {
  try {
    // Validar os parâmetros de entrada utilizando o schema de validação definido
    const { error, value } = validateSchema(loginSchema, req.body);
    if (error) {
      errorResponse(res, "Dados de entrada inválidos", 400, error.details.map(e => e.message).join(', '));
      return;
    }

    // Extrair email e senha dos dados validados
    const { email, password } = value as LoginUserRequest;
    
    // Verificar as credenciais do usuário utilizando o serviço de autenticação
    const { user, message } = await verifyUserCredentials(email, password);
    if (!user) {
      errorResponse(res, "Acesso negado", 401, message);
      return;
    }
    
    // Capturar hostname da Plataforma/Request
    const hostname = req.hostname;
    
    // Gerar token para o usuário
    const { token, expiresAt } = await generateToken(user.id, hostname);
    if (!token) {
      errorResponse(res, "Erro ao gerar um token para o usuário", 500, "Falha ao gerar token");
      return;
    }

    // Construir a resposta com o token e a data de expiração
    const response = {
      token: token,
      expiresAt: expiresAt
    }

    return successResponse(res, response, "Usuário autenticado com sucesso") as Response<LoginUserResponse>;
  } catch (error) {
    // Em caso de erro, passar o erro para o middleware de tratamento de erros
    next(error);
  }
};
