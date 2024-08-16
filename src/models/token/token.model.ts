import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../../config/database.config";
import User from "../user/user.model";

// Definindo os atributos do Token
interface TokenAttributes {
  id: string;
  userId: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
}

// Definindo os atributos necessários para criar um novo Token
interface TokenCreationAttributes
  extends Optional<TokenAttributes, "id" | "createdAt"> {}

// Classe Token que implementa os atributos do Token e os métodos do Sequelize
class Token
  extends Model<TokenAttributes, TokenCreationAttributes>
  implements TokenAttributes
{
  public id!: string;
  public userId!: string;
  public token!: string;
  public createdAt!: Date;
  public expiresAt!: Date;
}

Token.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Token",
    timestamps: false,
    indexes: [
      {
        unique: false,
        fields: ["userId"],
      },
      {
        unique: true,
        fields: ["token"],
      },
    ],
  }
);

User.hasMany(Token, { foreignKey: "userId" });
Token.belongsTo(User, { foreignKey: "userId" });

export default Token;
