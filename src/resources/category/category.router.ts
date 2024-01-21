import { Router } from 'express';
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from './category.service';
// import { cleanCache } from '../../middlewares/cleanCacheMiddleware';

const router = Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
// router.post('/', cleanCache, createCategory);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
