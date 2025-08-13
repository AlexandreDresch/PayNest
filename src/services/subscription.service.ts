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
};
