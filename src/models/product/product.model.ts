import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database.config";

// Definindo os atributos do usuário
interface ProductAttributes {
  id: string;
  name: string;
  value: number
  createdAt: Date;
  updatedAt: Date;
}

// Definindo os atributos necessários para criar um novo usuário
interface ProductCreationAttributes
  extends Optional<ProductAttributes, "id" | "createdAt" | "updatedAt"> {}

// Classe Product que implementa os atributos do usuário e os métodos do Sequelize
class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: string;
  public name!: string;
  public value!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    modelName: "Product",
    timestamps: true,
    hooks: {
      beforeUpdate: (product) => {
        product.updatedAt = new Date();
      },
    },
  }
);

export default Product;
