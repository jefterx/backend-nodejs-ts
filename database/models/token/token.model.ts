import Token from '../../../src/models/token/token.model';
import { getEnvVar } from '../../../src/utils/env.utils';

async function TokenModel(): Promise<void> {
  try {
    const env = getEnvVar("NODE_ENV");
    const syncOptions =
      env === "development" ? { force: true } : { alter: true };

    // Sincronizando o modelo Token
    await Token.sync(syncOptions); // Isso irá criar a tabela, se ela não existir

    // Tabela Token criada ou alterada com sucesso
    console.log(
      `Tabela Token ${syncOptions.force ? "criada" : "alterada"} com sucesso`
    );
  } catch (error) {
    // Erro ao criar ou alterar a tabela Token
    console.error("Erro ao criar ou alterar a tabela Token: ", error);
  }
}

export default TokenModel;
