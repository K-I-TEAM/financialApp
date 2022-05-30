import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './database/index.js';
import './models/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const main = async () => {
  try {
    await sequelize.sync({ force: true, alter: true });
    await sequelize.authenticate();

    console.log('Connection has been established successfully.');
    app.get('/', (req, res) => {
      res.send('Express + TypeScript Server!');
    });

    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

main();
