import bcrypt from "bcryptjs";

import User from "../models/user/user.model";

// Interface para a resposta da verificação de credenciais
interface VerifyUserCredentials {
  user: User | null;
  message: string;
}

// Função para verificar as credenciais do usuário
export const verifyUserCredentials = async (
  email: string,
  password: string
): Promise<VerifyUserCredentials> => {
  try {
    // Procurar o usuário no banco de dados pelo email
    const user = await User.findOne({
      where: { email },
      attributes: ["id", "password"],
    });
    if (!user)
      return {
        user: null,
        message: "Credenciais inválidas",
      } as VerifyUserCredentials; // Se o usuário não for encontrado

    // Comparar a senha fornecida com a senha armazenada no banco de dados
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return {
        user: null,
        message: "Credenciais inválidas",
      } as VerifyUserCredentials; // Se a senha não coincidir

    return {
      user,
      message: "Usuário autenticado com sucesso",
    } as VerifyUserCredentials;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido ao verificar as credenciais do usuário";
    throw new Error(`Erro ao verificar as credenciais do usuário: ${errorMessage}`);
  }
};
