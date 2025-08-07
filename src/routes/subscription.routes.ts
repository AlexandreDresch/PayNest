import { Router } from 'express';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
  res.status(200).send({
    title: 'GET all subscriptions',
    message: 'List of all subscriptions',
  });
});

subscriptionRouter.get('/:id', (req, res) => {
  const subscriptionId = req.params.id;
  res.status(200).send({
    title: `GET subscription ${subscriptionId}`,
    message: `Details of subscription ${subscriptionId}`,
  });
});

subscriptionRouter.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;
  res.status(200).send({
    title: `GET subscriptions for user ${userId}`,
    message: `List of subscriptions for user ${userId}`,
  });
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
  res.status(200).send({
    title: 'GET upcoming renewals',
    message: 'List of subscriptions with upcoming renewals',
  });
});

subscriptionRouter.post('/', (req, res) => {
  res.status(201).send({
    title: 'Create Subscription',
    message: 'Subscription created successfully!',
  });
});

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
