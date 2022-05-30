import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../database/index.js';
import { Account } from './Account.js';
import { Category } from './Category.js';

const User = sequelize.define(
  'users',
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
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telephone: {
      type: DataTypes.STRING,
    },
    birthdate: {
      type: DataTypes.DATE,
    },
    picture_url: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female'),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
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

//Relationships

User.hasMany(Category, {
  foreignKey: 'user_id',
  sourceKey: 'id',
});

Category.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
});

User.hasMany(Account, {
  foreignKey: 'user_id',
  sourceKey: 'id',
});

Account.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
});

export { User };
