import Platform from "../../src/models/platform/platform.model";
import PlatformProducts from "../../src/models/platform/platform-products.model";
import Product from "../../src/models/product/product.model";

async function PlatformProductsSeeder(): Promise<void> {
  try {
    // Buscar platforma default
    const platform = await Platform.findOne({
      where: { default: true },
      attributes: ["id", "name"],
    });

    if (!platform) {
      throw new Error("Nenhuma plataforma encontrada!");
    }

    // Buscar Produtos
    const produtos = await Product.findAll();

    if (!produtos.length) {
      throw new Error("Nenhum produto encontrado!");
    }

    // Inserir cada produto na model PlatformProducts
    for (const produto of produtos) {
      await PlatformProducts.create({
        platformId: platform.id,
        productId: produto.id,
      });
    }

    console.log("Produtos associados à plataforma padrão com sucesso!");
  } catch (error) {
    console.error("Erro ao associar produtos à plataforma padrão", error);
  }
}

export default PlatformProductsSeeder;
