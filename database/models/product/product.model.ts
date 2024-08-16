import Product from '../../../src/models/product/product.model';
import { getEnvVar } from '../../../src/utils/env.utils';

async function ProductModel(): Promise<void> {
  try {
    const env = getEnvVar("NODE_ENV");
    const syncOptions =
      env === "development" ? { force: true } : { alter: true };

    // Sincronizando o modelo Product
    await Product.sync(syncOptions); // Isso irá criar a tabela, se ela não existir

    // Tabela Product criada ou alterada com sucesso
    console.log(
      `Tabela Product ${syncOptions.force ? "criada" : "alterada"} com sucesso`
    );
  } catch (error) {
    // Erro ao criar ou alterar a tabela Product
    console.error("Erro ao criar ou alterar a tabela Product: ", error);
  }
}

export default ProductModel;
