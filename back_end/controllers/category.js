import { Category } from '../models/Category.js';
import { Transaction } from '../models/Transaction.js';
import { Op } from 'sequelize';

const listCategories = async (req, res, next) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).send('userId required');
  }
  try {
    const allCategories = await Category.findAll({
      where: {
        user_id: userId,
      },
    });
    return res.send(allCategories);
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findOne({
      where: {
        id: id,
      },
    });

    if (!category) {
      return res.status(404).json({ message: "Category doesn't exists" });
    }

    return res.send(category);
  } catch (error) {
    next(error);
  }
};

const getBalanceByCategory = async (req, res) => {
  try {
    const { categoryId, userId, startedDate, endedDate } = req.body;

    let queryBuilder = {};

    if (!userId || !categoryId) {
      return res.status(400).send('categoryId and userId are required');
    }

    queryBuilder = {
      category_id: categoryId,
      user_id: userId,
    };

    if (startedDate && endedDate) {
      queryBuilder = {
        ...queryBuilder,
        date: {
          [Op.between]: [startedDate, endedDate],
        },
      };
    }

    const balance = await Transaction.sum('amount', {
      where: queryBuilder,
    });

    res.status(200).json({ balance: balance });
  } catch (error) {
    res.status(500).send(error);
  }
};

const createCategory = async (req, res) => {
  const { name, description, icon, color, userId } = req.body;

  if (!name || !description || !icon || !color || !userId) {
    return res.status(400).send(`
    Those fields are required:
    name, description, icon, color, userId
    `);
  }

  try {
    const newCategory = await Category.create({
      name,
      description,
      icon,
      color,
      user_id: userId,
    });
    return res.send(newCategory);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, icon, color } = req.body;

  if (!name || !description || !icon || !color) {
    return res.status(400).send(`
    Those fields are required:
    name, description, icon, color
    `);
  }

  try {
    const category = await Category.findByPk(id);

    category.name = name;
    category.description = description;
    category.icon = icon;
    category.color = color;

    await category.save();

    return res.send(category);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(400).send(`Category do not exists`);
    } else {
      const result = await Category.destroy({
        where: {
          id: id,
        },
      });
      return res.status(200).send(`Category deleted ${result}`);
    }
  } catch (error) {
    next(error);
  }
};

export { listCategories, createCategory, getCategory, updateCategory, deleteCategory, getBalanceByCategory };
