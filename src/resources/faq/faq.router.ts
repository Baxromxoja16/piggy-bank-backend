import { Router } from 'express';
import { createFaq, deleteFaq, getAllFaqs, updateFaq, getFaqById } from './faq.service';
import auth from '../../middlewares/authMiddleware';

const router = Router();

router.get('/', getAllFaqs);
router.get('/:id', getFaqById);
router.post('/', auth, createFaq);
router.put('/:id', auth, updateFaq);
router.delete('/:id', auth, deleteFaq);

export default router;
