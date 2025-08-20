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

subscriptionRouter.get(
  '/upcoming-renewals',
  authorize,
  SubscriptionController.getUpcomingRenewals as RequestHandler,
);

subscriptionRouter.post(
  '/',
  authorize,
  SubscriptionController.createSubscription as RequestHandler,
);

subscriptionRouter.put(
  '/:id',
  authorize,
  SubscriptionController.updateSubscription as RequestHandler,
);

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
