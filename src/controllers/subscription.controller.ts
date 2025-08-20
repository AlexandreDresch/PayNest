import type { Response, NextFunction, Request } from 'express';
import { SubscriptionService } from '../services/subscription.service.js';

import type {
  AuthenticatedRequest,
  SubscriptionParams,
} from '../types/index.js';
import { workflowClient } from '../config/upstash.js';
import config from '../config/config.js';
import { SubscriptionRepository } from '../repositories/subscription.repository.js';

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

  async getUpcomingRenewals(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const upcomingRenewals = await SubscriptionService.getUpcomingRenewals(
        req.user._id,
      );

      res.status(200).json({
        success: true,
        message: 'Upcoming renewals retrieved successfully',
        data: upcomingRenewals,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateSubscription(
    req: Request<SubscriptionParams> & AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const subscriptionId = req.params.id;
      const updatedData = req.body;

      const updatedSubscription =
        await SubscriptionService.getSubscriptionById(subscriptionId);

      if (!updatedSubscription) {
        return res.status(404).json({
          success: false,
          message: 'Subscription not found',
        });
      }

      const result = await SubscriptionService.updateSubscription(
        req.user._id,
        {
          ...updatedSubscription,
          ...updatedData,
        },
      );

      res.status(200).json({
        success: true,
        message: `Subscription ${subscriptionId} updated successfully!`,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async cancelSubscription(
    req: Request<SubscriptionParams> & AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const subscriptionId = req.params.id;

      const subscription =
        await SubscriptionRepository.cancelSubscription(subscriptionId);

      res.status(200).json({
        success: true,
        message: `Subscription ${subscriptionId} canceled successfully!`,
        data: subscription,
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteSubscription(
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

      await SubscriptionRepository.deleteSubscription(subscriptionId);

      res.status(200).json({
        success: true,
        message: `Subscription ${subscriptionId} deleted successfully!`,
      });
    } catch (error) {
      next(error);
    }
  },
};
