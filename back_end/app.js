import express from 'express';
import userRoutes from './routes/user.js';
import transactionRoutes from './routes/transaction.js';
import categoryRoutes from './routes/category.js';

const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(transactionRoutes);
app.use(categoryRoutes);

export default app;
