import type { Response, NextFunction, Request } from 'express';
import { SubscriptionService } from '../services/subscription.service.js';

import type {
  AuthenticatedRequest,
  SubscriptionParams,
} from '../types/index.js';
import { workflowClient } from '../config/upstash.js';
import config from '../config/config.js';

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

      const { workflowRunId } = await workflowClient.trigger({
        url: config.serverUrl + '/api/v1/workflows/subscription/reminder',
        body: {
          subscriptionId: result._id.toString(),
        },
      });

      res.status(201).json({
        success: true,
        message: 'Subscription created successfully!',
        data: { subscription: result, workflowRunId },
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

      const subscriptions = await SubscriptionService.getSubscriptions(userId);

      res.status(200).json({
        success: true,
        message: 'List of all subscriptions',
        data: subscriptions,
      });
    } catch (error) {
      next(error);
    }
  },

  async getSubscriptionById(
    req: Request<SubscriptionParams> & AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const subscriptionId = req.params.id;
      const subscription =
        await SubscriptionService.getSubscriptionById(subscriptionId);

      if (!subscription) {
        return res.status(404).json({
          success: false,
          message: 'Subscription not found',
        });
      }

      res.status(200).json({
        success: true,
        message: `Details of subscription ${subscriptionId}`,
        data: subscription,
      });
    } catch (error) {
      next(error);
    }
  },
};
