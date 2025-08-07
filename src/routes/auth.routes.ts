import { Router } from 'express';

const authRouter = Router();

authRouter.post('sign-up', (req, res) => {
  res
    .status(201)
    .send({ title: 'Sign Up', message: 'User created successfully!' });
});

authRouter.post('sign-in', (req, res) => {
  res
    .status(200)
    .send({ title: 'Sign In', message: 'User signed in successfully!' });
});

authRouter.post('sign-out', (req, res) => {
  res
    .status(200)
    .send({ title: 'Sign Out', message: 'User signed out successfully!' });
});

export default authRouter;