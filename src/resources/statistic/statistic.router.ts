import { Router } from 'express';
import { getAllStatistics } from './statistics.service';

const router = Router();

router.get('/:accountId', getAllStatistics);

export default router;
