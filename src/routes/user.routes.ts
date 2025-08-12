import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/', UserController.getUsers);

userRouter.get('/:id', UserController.getUserById);

userRouter.patch('/:id', (req, res) => {
  const userId = req.params.id;
  res.status(200).send({
    title: `Update user ${userId}`,
    message: `User ${userId} updated successfully!`,
  });
});

userRouter.delete('/:id', (req, res) => {
  const userId = req.params.id;
  res.status(200).send({
    title: `Delete user ${userId}`,
    message: `User ${userId} deleted successfully!`,
  });
});

export default userRouter;
