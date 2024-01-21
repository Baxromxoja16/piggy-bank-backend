import { Router } from 'express';
import { getAllPiggyBanks, getPiggyBankById, createPiggyBank, updatePiggyBank, crashPiggyBank } from './piggy.service';

const router = Router();

router.get('/:accountId', getAllPiggyBanks);

router.get('/account/:id', getPiggyBankById);

router.post('/:accountId', createPiggyBank);

router.put('/:id', updatePiggyBank);

router.delete('/:id', crashPiggyBank);

export default router;
