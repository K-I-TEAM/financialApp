import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('db', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

export { sequelize };
