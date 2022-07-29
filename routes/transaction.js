import { Router } from 'express';
import {
  createTransaction,
  getTransaction,
  listTransactions,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transaction.js';

const router = Router();

router.get('/transactions', listTransactions);
router.post('/transactions', createTransaction);
router.put('/transactions/:id', updateTransaction);
router.delete('/transactions/:id', deleteTransaction);
router.get('/transactions/:id', getTransaction);

export default router;
