import { Router } from 'express';
import { WorkflowController } from '../controllers/workflow.controller.js';

const workflowRouter = Router();

workflowRouter.post('/subscription/reminder', WorkflowController.sendReminders);

export default workflowRouter;
