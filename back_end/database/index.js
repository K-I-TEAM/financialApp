import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('db', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
  },
  logging: true,
});

export { sequelize };
