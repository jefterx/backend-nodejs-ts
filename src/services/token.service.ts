import jwt from "jsonwebtoken";
import { Op } from "sequelize";

import Platform from "../models/platform/platform.model";
import Token from "../models/token/token.model";
import { getEnvVar } from "../utils/env.utils";

// Interface para a resposta da geração do token
interface GenerateToken {
  token: string;
  expiresAt: Date;
}

// Função para gerar um token para o usuário
export const generateToken = async (
  userId: string,
  hostname: string
): Promise<GenerateToken> => {
  try {
    // Buscar Token pelo Id do Usuário
    const token = await Token.findOne({
      where: { userId },
      order: [["createdAt", "DESC"]],
      attributes: ["token", "expiresAt"],
    });

    // Função auxiliar para gerar um novo token
    const createNewToken = async (): Promise<GenerateToken> => {
      // Coletar Id da Plataforma via Hostname ou Plataforma Padrão
      const platform = await Platform.findOne({
        where: {
          [Op.or]: [{ hostname }, { default: true }],
        },
        attributes: ["id"],
      });

      if (!platform) {
        throw new Error("Erro ao identificar plataforma");
      }

      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1); // Definindo expiração para 1 hora

      const token = jwt.sign(
        { userId, platformId: platform.id },
        getEnvVar("JWT_SECRET") as string,
        {
          expiresIn: "1h",
        }
      );

      // Salvando o novo token no banco de dados
      await Token.create({
        userId,
        token,
        expiresAt,
      });

      return { token, expiresAt };
    };

    if (!token) {
      // Gerar novo token se não houver token existente
      return await createNewToken();
    } else {
      // Verifique se o token expirou
      const isExpired = new Date(token.expiresAt) < new Date();

      if (isExpired) {
        // Gerar novo token se o token existente expirou
        return await createNewToken();
      } else {
        return {
          token: token.token,
          expiresAt: new Date(token.expiresAt),
        } as GenerateToken;
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido ao gerar um token para o usuário";
    throw new Error(`Erro ao gerar um token para o usuário: ${errorMessage}`);
  }
};
