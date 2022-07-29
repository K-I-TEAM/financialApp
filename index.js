import dotenv from 'dotenv';
import app from './app.js';
import { sequelize } from './database/index.js';
import './models/index.js';

dotenv.config();

const port = process.env.PORT || 3001;
const host = process.env.HOST || 'localhost';

const main = async () => {
  try {
    await sequelize.sync();
    await sequelize.authenticate();

    console.log('Connection has been established successfully.');
    app.get('/', (req, res) => {
      res.send('Express + TypeScript Server!');
    });

    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://${host}:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

main();
