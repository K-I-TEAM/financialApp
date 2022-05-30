import { User } from '../models/User.js';

const listUsers = async (req, res) => {
  const allUsers = await User.findAll();
  res.send(allUsers);
};

const createUser = async (req, res) => {
  const { name, surname, email, gender } = req.body;

  const newUser = await User.create({
    name,
    surname,
    email,
    gender,
  });

  res.send(newUser);
};

export { listUsers, createUser };
