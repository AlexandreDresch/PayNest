import Subscription from '../models/subscription.model.js';

export const SubscriptionRepository = {
  async createSubscription(userId: string, data: Partial<typeof Subscription>) {
    try {
      const subscription = await Subscription.create({
        ...data,
        userId,
      });

      return subscription;
    } catch (error: Error | any) {
      throw new Error('Failed to create subscription: ' + error.message);
    }
  },

  async getSubscriptionsByUserId(userId: string) {
    try {
      const subscriptions = await Subscription.find({ userId });
      return subscriptions;
    } catch (error: Error | any) {
      throw new Error('Failed to fetch subscriptions: ' + error.message);
    }
  },
};
