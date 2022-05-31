import { Router } from 'express';
import { createUser, getUser, listUsers, updateUser, deleteUser } from '../controllers/user.js';

const router = Router();

router.get('/users', listUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/users/:id', getUser);

export default router;
