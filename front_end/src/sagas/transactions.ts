import { put, call, select, takeEvery } from "redux-saga/effects";

import {
  listTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "./../api/transaction";
import { userSelector, currentDateSelector } from "./../selectors";

import {
  GET_TRANSACTIONS,
  setTransactions,
  ADD_TRANSACTION,
  setBalance,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
  getTransactions,
  GET_TRANSACTIONS_BY_CATEGORY,
  setTransactionsByCategory,
  setError,
} from "../actions";
import { daysInMonth } from "../helpers";

function* getTransactionsWorker(): any {
  const userId = (yield select(userSelector)).id;
  const date = yield select(currentDateSelector);
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    daysInMonth(date.getMonth() + 1, date.getFullYear()),
    23,
    59,
    59
  );
  try {
    //API call to get transactions
    const { data } = yield call(listTransactions, userId, firstDay, lastDay);
    const transactions = data.map((transaction: any) => {
      return {
        date: transaction.date,
        amount: Number(transaction.amount),
        type: transaction.type,
        category: transaction.category_id,
        id: transaction.id,
        description: transaction.description,
        balance: transaction.balance,
      };
    });
    const sortedTransactions = transactions.sort((a: any, b: any) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
    yield put(setTransactions(sortedTransactions));
    yield put(setBalance(data.length ? data[data.length - 1].balance : 0));
  } catch (error) {
    yield put(setError(error));
  }
}
export function* getTransactionsSaga(): any {
  yield takeEvery(GET_TRANSACTIONS, getTransactionsWorker);
}

function* addTransactionWorker(payload: any): any {
  const { transaction, userId } = payload.transaction;
  try {
    //API call to add transactions
    yield call(createTransaction, transaction, userId);
    yield put(getTransactions());
  } catch (error) {
    yield put(setError(error));
  }
}

export function* addTransactionSaga(): any {
  yield takeEvery(ADD_TRANSACTION, addTransactionWorker);
}

function* updateTransactionWorker(payload: any) {
  const { transaction } = payload;
  try {
    yield call(updateTransaction, { ...transaction, balance: undefined });
    yield put(getTransactions());
  } catch (err) {
    yield put(setError(err));
  }
}

export function* updateTransactionSaga(): any {
  yield takeEvery(UPDATE_TRANSACTION, updateTransactionWorker);
}

function* deleteTransactionWorker(payload: any) {
  const { transaction } = payload;
  try {
    yield call(deleteTransaction, transaction.id);
    yield put(getTransactions());
  } catch (err) {
    yield put(setError(err));
  }
}

export function* deleteTransactionSaga(): any {
  yield takeEvery(DELETE_TRANSACTION, deleteTransactionWorker);
}

function* getTransactionsByCategoryWorker(payload: any): any {
  const { categoryId } = payload;
  const userId = (yield select(userSelector)).id;
  const date = yield select(currentDateSelector);
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    daysInMonth(date.getMonth() + 1, date.getFullYear()),
    23,
    59,
    59
  );
  try {
    //API call to get transactions
    const { data } = yield call(
      listTransactions,
      userId,
      firstDay,
      lastDay,
      categoryId
    );
    const transactions = data.map((transaction: any) => {
      return {
        date: transaction.date,
        amount: Number(transaction.amount),
        type: transaction.type,
        category: transaction.category_id,
        id: transaction.id,
        description: transaction.description,
        balance: transaction.balance,
      };
    });
    const sortedTransactions = transactions.sort((a: any, b: any) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });

    yield put(setTransactionsByCategory(sortedTransactions));
  } catch (error) {
    yield put(setError(error));
  }
}

export function* getTransactionsByCategorySaga(): any {
  yield takeEvery(
    GET_TRANSACTIONS_BY_CATEGORY,
    getTransactionsByCategoryWorker
  );
}
