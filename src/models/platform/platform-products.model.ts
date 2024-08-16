import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database.config";
import Product from "../product/product.model";
import Platform from "./platform.model";

// Definindo os atributos do usuário
interface PlatformProductsAttributes {
  id: string;
  platformId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Definindo os atributos necessários para criar um novo usuário
interface PlatformProductsCreationAttributes
  extends Optional<PlatformProductsAttributes, "id" | "createdAt" | "updatedAt"> {}

// Classe PlatformProducts que implementa os atributos do usuário e os métodos do Sequelize
class PlatformProducts
  extends Model<PlatformProductsAttributes, PlatformProductsCreationAttributes>
  implements PlatformProductsAttributes
{
  public id!: string;
  public platformId!: string;
  public productId!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

PlatformProducts.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    platformId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Platforms",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Products",
        key: "id",
      },
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
    modelName: "PlatformProducts",
    timestamps: true,
    indexes: [
      {
        unique: false,
        fields: ["platformId"],
      },
      {
        unique: false,
        fields: ["productId"],
      },
    ],
    hooks: {
      beforeUpdate: (PlatformProducts) => {
        PlatformProducts.updatedAt = new Date();
      },
    },
  }
);

Product.hasMany(PlatformProducts, { foreignKey: "productId" });
PlatformProducts.belongsTo(Product, { foreignKey: "productId" });

Platform.hasMany(PlatformProducts, { foreignKey: "platformId" });
PlatformProducts.belongsTo(Platform, { foreignKey: "platformId" });

export default PlatformProducts;
