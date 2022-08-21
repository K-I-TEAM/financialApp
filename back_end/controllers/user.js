import { User } from '../models/User.js';

const listUsers = async (_req, res, next) => {
  console.log('list');
  try {
    const allUsers = await User.findAll();
    return res.send(allUsers);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User doesn't exists" });
    }

    return res.send(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (params) => {
  const { name, email } = params;

  const user = await User.create({
    name,
    email,
  });
  if (user.dataValues.id) {
    return user.dataValues;
  }
  return user;
};

//Add more fields and PATCH
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, surname, email, gender } = req.body;

  if (!name || !surname || !email || !gender) {
    return res.status(400).send(`
    Those fields are required:
    name, surname, email, gender
    `);
  }
  try {
    const user = await User.findByPk(id);

    user.name = name;
    user.surname = surname;
    user.email = email;
    user.gender = gender;

    await user.save();

    return res.send(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).send(`User do not exists`);
    } else {
      const result = await User.destroy({
        where: {
          id: id,
        },
      });
      return res.status(200).send(`User deleted ${result}`);
    }
  } catch (error) {
    next(error);
  }
};

const getUserId = async (req, res, next) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User doesn't exists" });
    }

    return res.send({ id: user.id });
  } catch (error) {
    next(error);
  }
};

//NOT REST API
const getUserByEmail = async (email) => {
  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    return false;
  }

  return user.dataValues;
};

export { listUsers, createUser, getUser, updateUser, deleteUser, getUserByEmail, getUserId };
