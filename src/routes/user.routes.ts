import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {
  res
    .status(200)
    .send({ title: 'GET all users', message: 'List of all users' });
});

userRouter.get('/:id', (req, res) => {
  const userId = req.params.id;
  res
    .status(200)
    .send({ title: `GET user ${userId}`, message: `Details of user ${userId}` });
});

userRouter.post('/', (req, res) => {
  res
    .status(201)
    .send({ title: 'Create User', message: 'User created successfully!' });
});

userRouter.put('/:id', (req, res) => {
  const userId = req.params.id;
  res
    .status(200)
    .send({ title: `Update user ${userId}`, message: `User ${userId} updated successfully!` });
});

userRouter.delete('/:id', (req, res) => {
  const userId = req.params.id;
  res
    .status(200)
    .send({ title: `Delete user ${userId}`, message: `User ${userId} deleted successfully!` });
});

export default userRouter;