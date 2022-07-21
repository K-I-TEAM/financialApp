import express from 'express';

import userRoutes from './routes/user.js';
import transactionRoutes from './routes/transaction.js';
import categoryRoutes from './routes/category.js';

import apiLayerRoutes from './routes/apiLayer.js';

import { checkToken } from './auth/checkToken.js';

import cors from 'cors';

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();

// Error handling Middleware functions
const errorLogger = (error, request, response, next) => {
  console.log(`error ${error.message}`);
  next(error); // calling next middleware
};

const errorResponder = (error, request, response, next) => {
  response.header('Content-Type', 'application/json');

  const status = error.status || 400;
  response.status(status).send(error.message);
};

const invalidPathHandler = (request, response, next) => {
  response.status(400);
  response.send(`Invalid path, ${request.url} does not exists`);
};

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
