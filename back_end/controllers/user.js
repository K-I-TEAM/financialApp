import { User } from '../models/User.js';

const listUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUser = async (req, res) => {
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

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createUser = async (req, res) => {
  const { name, surname, email, gender } = req.body;

  try {
    const newUser = await User.create({
      name,
      surname,
      email,
      gender,
    });
    res.send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

//Add more fields and PATCH
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, surname, email, gender } = req.body;

  try {
    const user = await User.findByPk(id);

    user.name = name;
    user.surname = surname;
    user.email = email;
    user.gender = gender;

    await user.save();

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.destroy({
      where: {
        id: id,
      },
    });
    res.send(204);
  } catch (error) {
    res.status(500).send(error);
  }
};

export { listUsers, createUser, getUser, updateUser, deleteUser };
