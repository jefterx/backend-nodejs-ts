import Platform from '../../../src/models/platform/platform.model';
import { getEnvVar } from '../../../src/utils/env.utils';

async function PlatformModel(): Promise<void> {
  try {
    const env = getEnvVar("NODE_ENV");
    const syncOptions =
      env === "development" ? { force: true } : { alter: true };

    // Sincronizando o modelo Platform
    await Platform.sync(syncOptions); // Isso irá criar a tabela, se ela não existir

    // Tabela Platform criada ou alterada com sucesso
    console.log(
      `Tabela Platform ${syncOptions.force ? "criada" : "alterada"} com sucesso`
    );
  } catch (error) {
    // Erro ao criar ou alterar a tabela Platform
    console.error("Erro ao criar ou alterar a tabela Platform: ", error);
  }
}

export default PlatformModel;
