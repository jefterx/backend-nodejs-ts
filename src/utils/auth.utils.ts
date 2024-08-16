import jwt from "jsonwebtoken";
import Token from "../models/token/token.model";
import { getEnvVar } from "./env.utils";

export const getTokenFromHeader = (
  authHeader: string | undefined
): string | null => {
  if (!authHeader) return null;
  const parts = authHeader.split(" ");
  return parts.length === 2 ? parts[1] : null;
};

export const verifyToken = (token: string): Promise<jwt.JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getEnvVar("JWT_SECRET"), (err, decoded) => {
      if (err || !decoded) {
        return reject(new Error("Token de autenticação inválido."));
      }
      if (
        typeof decoded !== "string" &&
        decoded.exp &&
        decoded.exp < Date.now() / 1000
      ) {
        return reject(new Error("Token de autenticação expirado."));
      }
      resolve(decoded as jwt.JwtPayload);
    });
  });
};

export const isTokenStored = async (token: string): Promise<boolean> => {
  const authToken = await Token.findOne({ where: { token } });
  return !!authToken;
};
