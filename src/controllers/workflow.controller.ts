import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');

import type { WorkflowContext } from '../types/index.js';

import { WorkflowService } from '../services/workflow.service.js';

export const WorkflowController = {
  sendReminders: serve(async (context: WorkflowContext) => {
    const { subscriptionId } = WorkflowService.validatePayload(context);

    await context.run('workflow-start', async () => {
      console.log(
        `Starting reminder workflow for subscription: ${subscriptionId}`,
      );
    });

    await WorkflowService.scheduleReminders(context, subscriptionId);
  }),
};
