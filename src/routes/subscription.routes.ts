import { Router, type RequestHandler } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { SubscriptionController } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.get(
  '/:id',
  authorize,
  SubscriptionController.getSubscriptionById as RequestHandler,
);

subscriptionRouter.get(
  '/user/:userId',
  authorize,
  SubscriptionController.getSubscriptions as RequestHandler,
);

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
  res.status(200).send({
    title: 'GET upcoming renewals',
    message: 'List of subscriptions with upcoming renewals',
  });
});

subscriptionRouter.post(
  '/',
  authorize,
  SubscriptionController.createSubscription as RequestHandler,
);

subscriptionRouter.put('/:id', (req, res) => {
  const subscriptionId = req.params.id;
  res.status(200).send({
    title: `Update subscription ${subscriptionId}`,
    message: `Subscription ${subscriptionId} updated successfully!`,
  });
});

subscriptionRouter.put(':id/cancel', (req, res) => {
  const subscriptionId = req.params.id;
  res.status(200).send({
    title: `Cancel subscription ${subscriptionId}`,
    message: `Subscription ${subscriptionId} canceled successfully!`,
  });
});

subscriptionRouter.delete('/:id', (req, res) => {
  const subscriptionId = req.params.id;
  res.status(200).send({
    title: `Delete subscription ${subscriptionId}`,
    message: `Subscription ${subscriptionId} deleted successfully!`,
  });
});

export default subscriptionRouter;
