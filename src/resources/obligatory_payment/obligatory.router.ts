import { Router } from 'express';
import { getAllObligatory, getObligatoryById, createObligatory, updateObligatory, deleteObligatory } from './obligatory.service';

const router = Router();

router.get('/', getAllObligatory);

router.get('/:id', getObligatoryById);

router.post('/', createObligatory);

router.put('/:id', updateObligatory);

router.delete('/:id', deleteObligatory);

export default router;
