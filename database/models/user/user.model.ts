import User from '../../../src/models/user/user.model';
import { getEnvVar } from '../../../src/utils/env.utils';

async function UserModel(): Promise<void> {
  try {
    const env = getEnvVar("NODE_ENV");
    const syncOptions =
      env === "development" ? { force: true } : { alter: true };

    // Sincronizando o modelo User
    await User.sync(syncOptions); // Isso irá criar a tabela, se ela não existir

    // Tabela User criada ou alterada com sucesso
    console.log(
      `Tabela User ${syncOptions.force ? "criada" : "alterada"} com sucesso`
    );
  } catch (error) {
    // Erro ao criar ou alterar a tabela User
    console.error("Erro ao criar ou alterar a tabela User: ", error);
  }
}

export default UserModel;
