import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');

import Subscription from '../models/subscription.model.js';
import dayjs from 'dayjs';
import type { WorkflowContext } from '../types/index.js';
import { WorkflowService } from '../services/workflow.service.js';

const REMINDERS = [7, 5, 2, 1];

export const WorkflowController = {
  sendReminders: serve(async (context: WorkflowContext) => {
    if (
      !context?.requestPayload ||
      typeof context.requestPayload !== 'object'
    ) {
      throw new Error('Invalid payload format');
    }

    const { subscriptionId } = context.requestPayload;
    if (!subscriptionId) {
      throw new Error('subscriptionId is required in payload');
    }

    await context.run('workflow-start', async () => {
      console.log(
        `Starting reminder workflow for subscription: ${subscriptionId}`,
      );
    });

    const subscription = await WorkflowController.fetchSubscription(
      context,
      subscriptionId,
    );

    if (!subscription) {
      await context.run('subscription check', async () => {
        console.warn(`Subscription ${subscriptionId} not found`);
      });
      return;
    }

    if (subscription.status !== 'active') {
      await context.run('status check', async () => {
        console.warn(`Subscription ${subscriptionId} is not active`);
      });
      return;
    }

    const renewalDate = dayjs(subscription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
      await context.run('date validation', async () => {
        console.log(
          `Renewal date has passed for subscription ${subscriptionId}`,
        );
      });
      return;
    }

    // ✅ Only send reminders after sleeping until correct date
    for (const daysBefore of REMINDERS) {
      const reminderDate = renewalDate.subtract(daysBefore, 'day');

      if (reminderDate.isAfter(dayjs())) {
        await WorkflowController.sleepUntilReminder(
          context,
          `Reminder ${daysBefore} days before renewal for ${subscriptionId}`,
          reminderDate,
        );

        await WorkflowService.triggerReminder(
          context,
          `Reminder ${daysBefore} days before renewal for ${subscriptionId}`,
        );
      }
    }
  }),

  async fetchSubscription(
    context: { run: (name: string, fn: () => Promise<any>) => Promise<any> },
    subscriptionId: string,
  ) {
    return await context.run('get subscription', async () => {
      const sub = await Subscription.findById(subscriptionId).populate({
        path: 'user',
        select: 'username email',
        strictPopulate: false,
      });
      return sub || null;
    });
  },

  async sleepUntilReminder(
    context: { sleepUntil: (label: string, date: Date) => Promise<void> },
    label: string,
    date: dayjs.Dayjs,
  ) {
    await context.sleepUntil(label, date.toDate());
    console.log(`Successfully scheduled reminder: ${label}`);
  },
};
