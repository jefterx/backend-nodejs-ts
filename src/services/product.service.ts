import PlatformProducts from "../models/platform/platform-products.model";
import Product from "../models/product/product.model";

export const getProductsForSale = async (platformId: string) => {
  try {
    const products = await Product.findAll({
      include: {
        model: PlatformProducts,
        where: {
          platformId: platformId,
        },
        attributes: [],
        required: true,
      },
      attributes: ["id", "name", "value"],
      raw: true,
    });
    return products;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido ao buscar produtos para venda";
    throw new Error(`Erro ao buscar produtos para venda: ${errorMessage}`);
  }
};
