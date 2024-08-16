import dotenv from "dotenv";
import { Sequelize } from "sequelize";

import { getEnvVar } from "../utils/env.utils";

dotenv.config(); // Carregar variáveis ​​de ambiente do arquivo .env

const sequelize = new Sequelize(
  getEnvVar("POSTGRES_DB_NAME"),
  getEnvVar("POSTGRES_DB_USER"),
  getEnvVar("POSTGRES_DB_PASSWORD"),
  {
    host: getEnvVar("POSTGRES_DB_HOST"),
    dialect: "postgres",
    timezone: "America/Sao_Paulo",
    dialectOptions: {
      useUTC: false,
      dateStrings: true,
      typeCast: true,
    },
    pool: {
      max: 5, // número máximo de conexões no pool
      min: 0, // número mínimo de conexões no pool
      acquire: 30000, // tempo máximo, em milissegundos, que o pool tentará obter a conexão antes de lançar o erro
      idle: 10000, // tempo máximo, em milissegundos, que uma conexão pode ser ociosa antes de ser liberada
    },
  }
);

export default sequelize;
