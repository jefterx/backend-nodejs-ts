import sequelize from '../src/config/database.config';
import PlatformModel from './models/platform/platform.model';
import PlatformProductsModel from './models/platform/platform-products.model';
import ProductCoveragesModel from './models/product/product-coverages';
import ProductModel from './models/product/product.model';
import TokenModel from './models/token/token.model';
import UserModel from './models/user/user.model';
import PlatformProductsSeeder from './seeders/platform-products.seeder';
import PlatformSeeder from './seeders/platform.seeder';
import ProductSeeder from './seeders/product.seeder';
import UserSeeder from './seeders/user.seeder';

async function main(): Promise<void> {
  try {
    // instalar extensões que potencializam o uso desses índices, como a pg_trgm para trigramas
    await sequelize.query("CREATE EXTENSION IF NOT EXISTS pg_trgm;");

    // Sync User
    await UserModel();
    await UserSeeder();

    // Sync Token
    await TokenModel();

    // Sync Product
    await ProductModel();
    await ProductSeeder();

    // Sync Product Coverages
    await ProductCoveragesModel();

    // Sync Platform
    await PlatformModel();
    await PlatformSeeder();

    // Sync PlatformProducts
    await PlatformProductsModel();
    await PlatformProductsSeeder();

    // Sincronização concluída
    console.log("Sincronização concluída");

    // Terminar o processo com sucesso
    process.exit(0);
  } catch (error) {
    // Erro durante a sincronização
    console.error("Erro durante a sincronização: ", error);

    // Terminar o processo com erro
    process.exit(1);
  }
}

main();
