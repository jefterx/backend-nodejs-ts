import { DataTypes, Model, Op, Optional } from 'sequelize';

import sequelize from '../../config/database.config';

// Definindo os atributos do usuário
interface PlatformAttributes {
  id: string;
  hostname: string;
  name: string;
  default: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Definindo os atributos necessários para criar um novo usuário
interface PlatformCreationAttributes
  extends Optional<PlatformAttributes, "id" | "default" | "createdAt" | "updatedAt"> {}

// Classe Platform que implementa os atributos do usuário e os métodos do Sequelize
class Platform
  extends Model<PlatformAttributes, PlatformCreationAttributes>
  implements PlatformAttributes
{
  public id!: string;
  public hostname!: string;
  public name!: string;
  public default!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;

  static async checkIfDefaultExists(this: typeof Platform, id: string | null = null) {
    const whereClause = id ? { default: true, id: { [Op.ne]: id } } : { default: true };
    const defaultPlatform = await this.findOne({ where: whereClause });
    if (defaultPlatform) {
      throw new Error("Já existe uma plataforma padrão.");
    }
  }
}

Platform.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    hostname: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: 0,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    default: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    modelName: "Platform",
    timestamps: true,
    hooks: {
      beforeCreate: async (platform) => {
        if (platform.default) {
          await Platform.checkIfDefaultExists();
        }
      },
      beforeUpdate: async (platform) => {
        if (platform.default) {
          await Platform.checkIfDefaultExists(platform.id);
        }
        platform.updatedAt = new Date();
      },
    },
  }
);

export default Platform;
