import cors from 'cors';
import express, { Request, Response } from 'express';

import { errorHandler } from './middlewares/error-handler.middleware';
import authRouter from './routes/auth.router';
import productRouter from './routes/product.router';
import userRouter from './routes/user.router';

const app = express();

app.use(cors()); // Use o CORS para permitir que o frontend acesse o backend

// Body parser para analisar o corpo da requisição
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.use(productRouter);
app.use(userRouter);

// Middleware de tratamento de erros
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Você não tem permissão para acessar esta página!").status(403);
});

export default app;
