import Product from "../../src/models/product/product.model";

async function ProductSeeder(): Promise<void> {
  try {
    const products = [
      {
        name: "77MED BLACK - INDIVIDUAL",
        value: 4990,
      },
      {
        name: "77MED BLACK - FAMILIAR",
        value: 4990,
      },
      {
        name: "77MED PREMIUM - INDIVIDUAL",
        value: 4990,
      },
      {
        name: "77MED PREMIUM - FAMILIAR",
        value: 4990,
      },
      {
        name: "77MED CLASSIC - INDIVIDUAL",
        value: 4990,
      },
      {
        name: "TELEMEDICINA ESPECIALIDADES - INDIVIDUAL",
        value: 4990,
      },
      {
        name: "TELEMEDICINA ESPECIALIDADES - FAMILIAR",
        value: 4990,
      },
    ];

    for (const productData of products) {
      const [product, created] = await Product.findOrCreate({
        where: { name: productData.name },
        defaults: productData,
      });

      if (created) {
        console.log(`Produto ${product.name} criado com sucesso:`);
      } else {
        console.log(`Produto ${product.name} já existe:`);
      }

      console.log(
        `ID: ${product.id}, Nome: ${product.name}, value: ${product.value}`
      );
    }
  } catch (error) {
    // Erro ao criar ou alterar a tabela product
    console.error("Erro ao criar Produtos: ", error);
  }
}

export default ProductSeeder;
