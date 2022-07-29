import express from 'express';

import userRoutes from './routes/user.js';
import transactionRoutes from './routes/transaction.js';
import categoryRoutes from './routes/category.js';

import apiLayerRoutes from './routes/apiLayer.js';

import { checkToken } from './auth/checkToken.js';

import cors from 'cors';

import { errorLogger, errorResponder, invalidPathHandler } from './helper/errorHandler.js';

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use(checkToken);

app.use(userRoutes);
app.use(transactionRoutes);
app.use(categoryRoutes);
app.use(apiLayerRoutes);

app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);

export default app;
