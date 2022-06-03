import express from 'express';
import userRoutes from './routes/user.js';
import transactionRoutes from './routes/transaction.js';

const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(transactionRoutes);

export default app;
