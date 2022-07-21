import { Category } from '../models/Category.js';

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
    res.send(allCategories);
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

    res.send(category);
  } catch (error) {
    next(error);
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
    res.send(newCategory);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res) => {
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

    res.send(category);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.destroy({
      where: {
        id: id,
      },
    });
    res.send(204);
  } catch (error) {
    next(error);
  }
};

export { listCategories, createCategory, getCategory, updateCategory, deleteCategory };
