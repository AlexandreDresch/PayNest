import type Subscription from '../models/subscription.model.js';
import { SubscriptionRepository } from '../repositories/subscription.repository.js';

export const SubscriptionService = {
  async createSubscription(userId: string, data: Partial<typeof Subscription>) {
    const newSubscription = await SubscriptionRepository.createSubscription(
      userId,
      data,
    );

    return newSubscription;
  },

  async getSubscriptions(userId: string) {
    return SubscriptionRepository.getSubscriptionsByUserId(userId);
  },

  async getSubscriptionById(subscriptionId: string) {
    return SubscriptionRepository.getSubscriptionById(subscriptionId);
  },

  async getUpcomingRenewals(userId: string) {
    return SubscriptionRepository.getUpcomingRenewals(userId);
  },

  async updateSubscription(
    subscriptionId: string,
    data: Partial<typeof Subscription>,
  ) {
    const subscription = await SubscriptionRepository.getById(
      { run: async (_name, fn) => fn() },
      subscriptionId,
    );

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    Object.assign(subscription, data);
    await subscription.save();

    return subscription;
  },
};
