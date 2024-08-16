/**
 * Recupera o valor de uma variável de ambiente.
 * @param key - A chave da variável de ambiente.
 * @returns O valor da variável de ambiente.
 * @throws {Error} Se a variável de ambiente não estiver definida.
 */
export const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`A variável de ambiente ${key} não está definida. Por favor, verifique o arquivo .env ou as configurações do ambiente.`);
  }
  return value;
};
