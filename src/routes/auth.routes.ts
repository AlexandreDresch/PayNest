import { Router } from 'express';

import { AuthController } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/sign-up', AuthController.signUp);

authRouter.post('/sign-in', AuthController.signIn);

authRouter.post('/sign-out', AuthController.signOut);

export default authRouter;
