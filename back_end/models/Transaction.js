import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../database/index.js';

const Transaction = sequelize.define(
  'transactions',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM('income', 'expense'),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    currency: {
      type: DataTypes.STRING(3),
    },
    created_by: {
      type: DataTypes.UUID,
    },
    updated_by: {
      type: DataTypes.UUID,
    },
    deleted_by: {
      type: DataTypes.UUID,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
  },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export { Transaction };
