import { Router } from 'express';

import { createAccount, deleteAccount, getAccountsByUserId, updateAccount, getAccountById } from './account.service';
// import { cleanCache } from '../../middlewares/cleanCacheMiddleware';

const router = Router();

router.get('/', getAccountsByUserId);
router.get('/:id', getAccountById);
router.post('/', createAccount);
router.put('/:id', updateAccount);
router.delete('/:id', deleteAccount);

export default router;
