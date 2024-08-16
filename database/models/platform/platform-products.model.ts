import PlatformProducts from '../../../src/models/platform/platform-products.model';
import { getEnvVar } from '../../../src/utils/env.utils';

async function PlatformProductsModel(): Promise<void> {
  try {
    const env = getEnvVar("NODE_ENV");
    const syncOptions =
      env === "development" ? { force: true } : { alter: true };

    // Sincronizando o modelo PlatformProducts
    await PlatformProducts.sync(syncOptions); // Isso irá criar a tabela, se ela não existir

    // Tabela PlatformProducts criada ou alterada com sucesso
    console.log(
      `Tabela PlatformProducts ${syncOptions.force ? "criada" : "alterada"} com sucesso`
    );
  } catch (error) {
    // Erro ao criar ou alterar a tabela PlatformProducts
    console.error("Erro ao criar ou alterar a tabela PlatformProducts: ", error);
  }
}

export default PlatformProductsModel;
