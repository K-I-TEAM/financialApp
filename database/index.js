import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

let sequelize;

if (!process.env.ENVIRONMET) {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
    },
    logging: false,
  });
} else {
  sequelize = new Sequelize(process.env.DATABASE_URL);
}

export { sequelize };
