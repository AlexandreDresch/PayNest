import type { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
    email: string;
  };
}

interface WorkflowPayload {
  subscriptionId: string;
}

export interface WorkflowContext {
  requestPayload: WorkflowPayload;
  run<T>(name: string, fn: () => Promise<T>): Promise<T>;
  sleepUntil(label: string, date: Date): Promise<void>;
}
