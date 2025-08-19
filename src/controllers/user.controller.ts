import type { Request, Response, NextFunction } from 'express';

import { UserService } from '../services/user.service.js';

export const UserController = {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({
        success: true,
        message: 'Fetched users successfully!',
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'User ID is required!',
        });
      }

      const user = await UserService.getUserById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found!',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Fetched user successfully!',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const userData = req.body;

      if (!userId || !userData) {
        return res.status(400).json({
          success: false,
          message: 'User ID and data are required!',
        });
      }

      const updatedUser = await UserService.updateUser(userId, userData);

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found or update failed!',
        });
      }

      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'User ID is required!',
        });
      }

      const deletedUser = await UserService.deleteUser(userId);

      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found or deletion failed!',
        });
      }

      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
      });
    } catch (error) {
      next(error);
    }
  },
};
