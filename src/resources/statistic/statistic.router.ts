import { Router } from 'express';
import { getAllStatistics } from './statistics.service';

const router = Router();

router.post('/:accountId', getAllStatistics);

export default router;
