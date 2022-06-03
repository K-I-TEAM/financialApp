import { Router } from 'express';
import {
  createCategory,
  getCategory,
  listCategories,
  updateCategory,
  deleteCategory,
} from '../controllers/category.js';

const router = Router();

router.get('/categories', listCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);
router.get('/categories/:id', getCategory);

export default router;
