import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database.config";
import Product from "./product.model";

// Definindo os atributos do usuário
interface ProductCoveragesAttributes {
  id: string;
  productId: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// Definindo os atributos necessários para criar um novo usuário
interface ProductCoveragesCreationAttributes
  extends Optional<ProductCoveragesAttributes, "id" | "createdAt" | "updatedAt"> {}

// Classe ProductCoverages que implementa os atributos do usuário e os métodos do Sequelize
class ProductCoverages
  extends Model<ProductCoveragesAttributes, ProductCoveragesCreationAttributes>
  implements ProductCoveragesAttributes
{
  public id!: string;
  public productId!: string;
  public name!: string;
  public description!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

ProductCoverages.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Products",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: "ProductCoverages",
    timestamps: true,
    indexes: [
      {
        unique: false,
        fields: ["productId"],
      },
    ],
    hooks: {
      beforeUpdate: (productCoverages) => {
        productCoverages.updatedAt = new Date();
      },
    },
  }
);

Product.hasMany(ProductCoverages, { foreignKey: "productId" });
ProductCoverages.belongsTo(Product, { foreignKey: "productId" });

export default ProductCoverages;
