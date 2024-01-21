import { Request, Response, NextFunction } from 'express';
import SubscriptionRepository from './subscription.repository';

export async function getAllSubscriptions(req: Request, res: Response, next: NextFunction) {
  try {
    const subscriptions = await SubscriptionRepository.getSubsAll(req.params.accountId);
    res.json(subscriptions);
  } catch (err) {
    next(err);
  }
}

export async function getSubscriptionById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const subscription = await SubscriptionRepository.getSubsByID(id);
    res.json(subscription);
  } catch (err) {
    next(err);
  }
}

export async function createSubscription(req: Request, res: Response, next: NextFunction) {
  try {
    const subscription = await SubscriptionRepository.createSubs({
      ...req.body,
      account_id: req.params.accountId,
    });
    res.json(subscription);
  } catch (err) {
    next(err);
  }
}

export async function updateSubscription(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const subscription = await SubscriptionRepository.editSubs(id, req.body);
    res.json(subscription);
  } catch (err) {
    next(err);
  }
}

export async function deleteSubscription(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await SubscriptionRepository.removeSubs(id);
    res.status(204).json();
  } catch (err) {
    next(err);
  }
}
