import dotenv from 'dotenv';

import app from './app';

dotenv.config(); // Carregar variáveis ​​de ambiente do arquivo .env

// Defina a porta e inicie o servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});