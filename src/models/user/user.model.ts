import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database.config";

// Definindo os atributos do usuário
interface UserAttributes {
  id: string;
  email: string;
  password: string;
  level: number;
  cpf: string;
  name: string;
  birth_date: Date;
  gender: string;
  phone: string;
  zip_code: string;
  address: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  createdAt: Date;
  updatedAt: Date;
}

// Definindo os atributos necessários para criar um novo usuário
interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt"> {}

// Classe User que implementa os atributos do usuário e os métodos do Sequelize
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public email!: string;
  public password!: string;
  public level!: number;
  public cpf!: string;
  public name!: string;
  public birth_date!: Date;
  public gender!: string;
  public phone!: string;
  public zip_code!: string;
  public address!: string;
  public number!: string;
  public complement?: string;
  public district!: string;
  public city!: string;
  public state!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("M", "F"),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.STRING(8),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    complement: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    district: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    state: {
      type: DataTypes.CHAR(2),
      allowNull: false,
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
    modelName: "User",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
      {
        unique: true,
        fields: ["cpf"],
      },
    ],
    hooks: {
      beforeUpdate: (user) => {
        user.updatedAt = new Date();
      },
    },
  }
);

export default User;
