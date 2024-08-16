import express, { NextFunction, Request, Response, Router } from 'express';

import * as productController from '../controllers/product.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router: Router = express.Router();

// Definição das Rotas
router.get('/products-for-sale', authenticateToken, (req: Request, res: Response, next: NextFunction) => {
  productController.productsForSale(req, res, next);
});

export default router;