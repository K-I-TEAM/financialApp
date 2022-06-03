import { Category } from '../models/Category.js';

const listCategories = async (req, res) => {
  try {
    const allCategories = await Category.findAll();
    res.send(allCategories);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCategory = async (req, res) => {
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
    res.status(500).send(error);
  }
};

const createCategory = async (req, res) => {
  const { name, description, icon, color } = req.body;

  try {
    const newCategory = await Category.create({
      name,
      description,
      icon,
      color,
    });
    res.send(newCategory);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description, icon, color } = req.body;

  try {
    const category = await Category.findByPk(id);

    category.name = name;
    category.description = description;
    category.icon = icon;
    category.color = color;

    await category.save();

    res.send(category);
  } catch (error) {
    res.status(500).send(error);
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
    res.status(500).send(error);
  }
};

export { listCategories, createCategory, getCategory, updateCategory, deleteCategory };
