import express, { NextFunction, Request, Response, Router } from 'express';

import * as userController from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router: Router = express.Router();

// Definição das Rotas
router.post('/new-user', authenticateToken, (req: Request, res: Response, next: NextFunction) => {
  userController.newUser(req, res, next);
});

export default router;