import { Router } from 'express';
import { getSymbols } from '../controllers/apiLayer.js';

const router = Router();

router.get('/symbols', getSymbols);

export default router;
