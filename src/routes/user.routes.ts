import { Router } from 'express';

import { UserController } from '../controllers/user.controller.js';

import authorize from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', UserController.getUsers);

userRouter.get('/:id', authorize, UserController.getUserById);

userRouter.patch('/:id', authorize, UserController.updateUser);

userRouter.delete('/:id', authorize, UserController.deleteUser);

export default userRouter;
