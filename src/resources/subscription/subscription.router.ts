import { Router } from 'express';
import { createSubscription, getAllSubscriptions, getSubscriptionById, updateSubscription, deleteSubscription } from './subscription.service';

const router = Router();

router.get('/:accountId', getAllSubscriptions);
router.get('/:id', getSubscriptionById);
router.post('/:accountId', createSubscription);
router.put('/:id', updateSubscription);
router.delete('/:id', deleteSubscription);

export default router;
