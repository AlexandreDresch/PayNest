import dayjs from 'dayjs';

import type { WorkflowContext } from '../types/index.js';

import { SubscriptionRepository } from '../repositories/subscription.repository.js';

import { ReminderService } from './reminder.service.js';
import { sendReminderEmail } from '../utils/send-email.js';

const REMINDERS = [7, 5, 2, 1];

export const WorkflowService = {
  async triggerReminder(
    context: WorkflowContext,
    label: string,
  ): Promise<void> {
    return await context.run(label, async () => {
      const subscription = await SubscriptionRepository.getById(
        context,
        context.requestPayload.subscriptionId,
      );

      await sendReminderEmail({
        to: context.requestPayload.user.email,
        type: label,
        subscription,
      }).catch((error) => {
        console.error(`Failed to send reminder email for ${label}:`, error);
      });
    });
  },

  validatePayload(context: WorkflowContext) {
    if (
      !context?.requestPayload ||
      typeof context.requestPayload !== 'object'
    ) {
      throw new Error('Invalid payload format');
    }

    const { subscriptionId } = context.requestPayload as {
      subscriptionId?: string;
    };
    if (!subscriptionId) {
      throw new Error('subscriptionId is required in payload');
    }

    return { subscriptionId };
  },

  async scheduleReminders(context: WorkflowContext, subscriptionId: string) {
    const subscription = await SubscriptionRepository.getById(
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

    for (const daysBefore of REMINDERS) {
      const reminderDate = renewalDate.subtract(daysBefore, 'day');

      if (reminderDate.isAfter(dayjs())) {
        await ReminderService.scheduleReminder(
          context,
          daysBefore,
          reminderDate,
        );
      }
    }
  },
};
