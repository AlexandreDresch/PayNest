import dayjs from 'dayjs';
import type { WorkflowContext } from '../types/index.js';
import { WorkflowService as WFService } from './workflow.service.js';

export const ReminderService = {
  async scheduleReminder(
    context: WorkflowContext,
    subscriptionId: string,
    daysBefore: number,
    reminderDate: dayjs.Dayjs,
  ) {
    const label = `Reminder ${daysBefore} days before renewal for ${subscriptionId}`;

    await context.sleepUntil(label, reminderDate.toDate());
    console.log(`Successfully scheduled reminder: ${label}`);

    await WFService.triggerReminder(context, label);
  },
};
