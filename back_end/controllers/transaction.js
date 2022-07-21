import { Transaction } from '../models/Transaction.js';
import { Category } from '../models/Category.js';
import { Op } from 'sequelize';
import { calculateBalances } from '../helper/balance.js';
import { v4 as uuidv4 } from 'uuid';

const listTransactions = async (req, res) => {
  const { userId, startedDate, endedDate, categoryId } = req.query;

  try {
    let allTransactions = [];
    let queryBuilder = {};

    if (!userId) {
      return res.status(400).send('userId required');
    }

    //Add validation

    queryBuilder = {
      ...queryBuilder,
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

    if (categoryId) {
      queryBuilder = {
        ...queryBuilder,
        category_id: categoryId,
      };
    }

    allTransactions = await Transaction.findAll({
      include: Category,
      where: queryBuilder,
      //logging: console.log,
    });

    const transactions = calculateBalances(allTransactions);
    return res.json(transactions);
  } catch (error) {
    next(error);
  }
};

const getTransaction = async (req, res, next) => {
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

    return res.send(transaction);
  } catch (error) {
    next(error);
  }
};

const createTransaction = async (req, res, next) => {
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

    return res.send(transaction);
  } catch (error) {
    next(error);
  }
};

const updateTransaction = async (req, res, next) => {
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

    return res.send(transaction);
  } catch (error) {
    next(error);
  }
};

const deleteTransaction = async (req, res, next) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      return res.status(400).send(`Transaction do not exists`);
    } else {
      const result = await Transaction.destroy({
        where: {
          id: id,
        },
      });
      return res.send(200).send(`Transaction deleted ${result}`);
    }
  } catch (error) {
    next(error);
  }
};

export { listTransactions, createTransaction, getTransaction, updateTransaction, deleteTransaction };
