import { Transaction } from '../models/Transaction.js';
import { Category } from '../models/Category.js';
import { Op } from 'sequelize';
import { calculateBalances } from '../helper/balance.js';
import { v4 as uuidv4 } from 'uuid';

const listTransactions = async (req, res, next) => {
  const { userId, startedDate, endedDate } = req.query;

  try {
    let allTransactions = [];

    if (!userId) {
      return res.status(400).send('userId required');
    }

    if (startedDate === undefined && endedDate === undefined) {
      allTransactions = await Transaction.findAll({
        include: Category,
        where: {
          user_id: userId,
        },
      });
    } else {
      allTransactions = await Transaction.findAll({
        include: Category,
        where: {
          user_id: userId,
          date: {
            [Op.between]: [startedDate, endedDate],
          },
        },
        //logging: console.log,
      });
    }

    const transactions = calculateBalances(allTransactions);
    res.json(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findOne({
      include: Category,
      where: {
        id: id,
      },
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction doesn't exists" });
    }

    res.send(transaction);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createTransaction = async (req, res) => {
  const { date, type, description, category, amount, userId } = req.body;

  if (!date || !type || !description || !category || !amount || !userId) {
    return res.status(400).send(`
    Those fields are required:
    date, type, description, category, amount, userId
    `);
  }

  const id = uuidv4();

  try {
    await Transaction.create({
      id: id,
      date,
      type,
      description,
      category_id: category,
      amount,
      user_id: userId,
    });

    const transaction = await Transaction.findByPk(id, {
      include: Category,
    });
    res.send(transaction);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { date, type, description, category, amount } = req.body;

  if (!date || !type || !description || !category || !amount) {
    return res.status(400).send(`
    Those fields are required:
    date, type, description, category, amount
    `);
  }

  try {
    const transaction = await Transaction.findByPk(id);

    transaction.date = date;
    transaction.type = type;
    transaction.description = description;
    transaction.category = category;
    transaction.amount = amount;

    await transaction.save();

    res.send(transaction);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    await Transaction.destroy({
      where: {
        id: id,
      },
    });
    res.send(204);
  } catch (error) {
    res.status(500).send(error);
  }
};

export { listTransactions, createTransaction, getTransaction, updateTransaction, deleteTransaction };
