import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../database/index.js';
import { Transaction } from './Transaction.js';

const Account = sequelize.define(
  'accounts',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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

Account.hasMany(Transaction, {
  foreignKey: 'account_id',
  sourceKey: 'id',
});

Transaction.belongsTo(Account, {
  foreignKey: 'account_id',
  targetKey: 'id',
});

export { Account };