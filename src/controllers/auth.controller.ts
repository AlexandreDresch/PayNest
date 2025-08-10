import type { Request, Response, NextFunction } from 'express';

import { AuthService } from '../services/auth.service.js';

export const AuthController = {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body;

      const result = await AuthService.signUp(username, email, password);

      res.status(201).json({
        success: true,
        message: 'User created successfully!',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .send({ title: 'Sign In', message: 'All fields are required!' });
      }

      const result = await AuthService.authenticateUser(email, password);

      if (!result) {
        return res
          .status(400)
          .send({ title: 'Sign In', message: 'Invalid email or password!' });
      }

      res.status(200).json({
        success: true,
        message: 'User signed in successfully!',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async signOut(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .status(200)
        .json({ success: true, message: 'User signed out successfully!' });
    } catch (error) {
      next(error);
    }
  },
};
