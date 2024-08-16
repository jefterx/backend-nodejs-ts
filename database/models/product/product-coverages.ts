import ProductCoverages from '../../../src/models/product/product-coverages';
import { getEnvVar } from '../../../src/utils/env.utils';

async function ProductCoveragesModel(): Promise<void> {
  try {
    const env = getEnvVar("NODE_ENV");
    const syncOptions =
      env === "development" ? { force: true } : { alter: true };

    // Sincronizando o modelo ProductCoverages
    await ProductCoverages.sync(syncOptions); // Isso irá criar a tabela, se ela não existir

    // Tabela ProductCoverages criada ou alterada com sucesso
    console.log(
      `Tabela ProductCoverages ${syncOptions.force ? "criada" : "alterada"} com sucesso`
    );
  } catch (error) {
    // Erro ao criar ou alterar a tabela ProductCoverages
    console.error("Erro ao criar ou alterar a tabela ProductCoverages: ", error);
  }
}

export default ProductCoveragesModel;
