import { Router } from 'express';
import { createUser, listUsers } from '../controllers/user.js';

const router = Router();

router.get('/users', listUsers);
router.post('/users', createUser);
router.put('/users/:id');
router.delete('/users:id');
router.get('/users/:id');

export default router;
