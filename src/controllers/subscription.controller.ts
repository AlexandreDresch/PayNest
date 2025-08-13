import type { Response, NextFunction } from 'express';
import { SubscriptionService } from '../services/subscription.service.js';

import type { AuthenticatedRequest } from '../types/index.js';

export const SubscriptionController = {
  async createSubscription(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await SubscriptionService.createSubscription(
        req.user._id,
        req.body,
      );

      res.status(201).json({
        success: true,
        message: 'Subscription created successfully!',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async getSubscriptions(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.params.userId;

      if (req.user._id.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to view this user's subscriptions.",
        });
      }

      const subscriptions = await SubscriptionService.getSubscriptions(
        userId,
      );

      res.status(200).json({
        success: true,
        message: 'List of all subscriptions',
        data: subscriptions,
      });
    } catch (error) {
      next(error);
    }
  },
};
