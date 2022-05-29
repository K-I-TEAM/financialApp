import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

const sequelize = new Sequelize('db', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});