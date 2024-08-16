import express, { NextFunction, Request, Response, Router } from 'express';

import * as authController from '../controllers/auth.controller';

const router: Router = express.Router();

// Definição das Rotas
router.post('/login/authenticate', (req: Request, res: Response, next: NextFunction) => {
  authController.loginUser(req, res, next);
});

export default router;