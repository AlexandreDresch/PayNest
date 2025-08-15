import { Client as WorkflowClient } from '@upstash/workflow';
import config from './config.js';

export const workflowClient = new WorkflowClient({
  baseUrl: config.qstashUrl,
  token: config.sqashToken,
});
