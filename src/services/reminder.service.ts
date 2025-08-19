import dayjs from 'dayjs';
import type { WorkflowContext } from '../types/index.js';
import { WorkflowService as WFService } from './workflow.service.js';

export const ReminderService = {
  async scheduleReminder(
    context: WorkflowContext,
    daysBefore: number,
    reminderDate: dayjs.Dayjs,
  ) {
    const label = `${daysBefore} days before reminder`;

    await context.sleepUntil(label, reminderDate.toDate());

    await WFService.triggerReminder(context, label);
  },
};
