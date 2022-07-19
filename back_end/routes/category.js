import { Router } from 'express';
import {
  createCategory,
  getCategory,
  listCategories,
  updateCategory,
  deleteCategory,
  getBalanceByCategory,
} from '../controllers/category.js';

const router = Router();

router.get('/categories', listCategories);
router.get('/categories/:id', getCategory);
router.get('/categoryBalance', getBalanceByCategory);

router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router;
