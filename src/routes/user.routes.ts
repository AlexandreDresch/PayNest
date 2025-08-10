import { Router } from 'express';
import { get } from 'http';
import { UserService } from '../services/user.service.js';

const userRouter = Router();

userRouter.get('/', UserService.getAllUsers);

userRouter.get('/:id', UserService.getUserById);

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
