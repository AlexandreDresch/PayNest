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

  async getById(
    context: { run: (name: string, fn: () => Promise<any>) => Promise<any> },
    id: string,
  ) {
    return await context.run('get subscription', async () => {
      const sub = await Subscription.findById(id).populate({
        path: 'user',
        select: 'username email',
        strictPopulate: false,
      });
      return sub || null;
    });
  },

  async getSubscriptionsByUserId(userId: string) {
    try {
      const subscriptions = await Subscription.find({ userId });
      return subscriptions;
    } catch (error: Error | any) {
      throw new Error('Failed to fetch subscriptions: ' + error.message);
    }
  },

  async getSubscriptionById(subscriptionId: string) {
    try {
      const subscription = await Subscription.findById(subscriptionId);
      return subscription;
    } catch (error: Error | any) {
      throw new Error('Failed to fetch subscription: ' + error.message);
    }
  },

  async getUpcomingRenewals(userId: string) {
    try {
      const subscriptions = await Subscription.find({
        userId,
        nextBillingDate: { $gte: new Date() },
      }).sort({ nextBillingDate: 1 });

      return subscriptions;
    } catch (error: Error | any) {
      throw new Error('Failed to fetch upcoming renewals: ' + error.message);
    }
  },
};
