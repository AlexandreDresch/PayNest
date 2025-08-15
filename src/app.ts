import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import workflowRouter from './routes/workflow.routes.js';

import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';

app
  .use(express.json({ limit: '50mb' }))
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(arcjetMiddleware as express.RequestHandler)
  .use('/api/v1/auth', authRouter)
  .use('/api/v1/users', userRouter)
  .use('/api/v1/subscriptions', subscriptionRouter)
  .use('/api/v1/workflows', workflowRouter)
  .use('/health', (_req, res) => res.status(200).send('OK'))
  .use(errorMiddleware);

export default app;
