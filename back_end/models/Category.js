import { DataTypes } from 'sequelize';
import { sequelize } from '../database/index.js';
import { Transaction } from './Transaction.js';

const Category = sequelize.define(
  'categories',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.STRING,
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    updated_by: {
      type: DataTypes.UUID,
      allowNull: false,
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

Category.hasMany(Transaction, {
  foreignKey: 'category_id',
  sourceKey: 'id',
});

Transaction.belongsTo(Category, {
  foreignKey: 'category_id',
  targetKey: 'id',
});

export { Category };
