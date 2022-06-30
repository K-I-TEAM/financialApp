import { Router } from 'express';
import { createUser, getUser, listUsers, updateUser, deleteUser, getUserId } from '../controllers/user.js';

const router = Router();

router.get('/users', listUsers);
router.get('/users/:email', getUserId);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/users/:id', getUser);

export default router;
