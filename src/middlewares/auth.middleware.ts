import { NextFunction, Request, Response } from 'express';

import { getTokenFromHeader, isTokenStored, verifyToken } from '../utils/auth.utils';
import { errorResponse } from '../utils/response-formatter.utils';

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = getTokenFromHeader(req.headers["authorization"]);

    if (!token) {
      errorResponse(res, "Acesso negado", 401, "Token de autenticação não informado.");
      return;
    }

    let decodedToken;
    try {
      decodedToken = await verifyToken(token);
    } catch (err) {
      errorResponse(res, "Acesso negado", 403, err instanceof Error ? err.message : String(err));
      return;
    }

    if (!(await isTokenStored(token))) {
      errorResponse(res, "Acesso negado", 403, "Token de autenticação inválido ou não encontrado.");
      return;
    }

    req.tokenData = {
      userId: decodedToken.userId as string,
      platformId: decodedToken.platformId as string,
    };

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido ao verificar as credenciais do usuário";
    errorResponse(res, "Erro interno do servidor", 500, `Erro ao verificar as credenciais do usuário: ${errorMessage}`);
  }
};
