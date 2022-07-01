import { take, put, call, select, takeEvery } from "redux-saga/effects";

import { listTransactions, createTransaction } from "./../api/transaction";
import { transactionsSelector } from "./../selectors";

import { GET_TRANSACTIONS, setTransactions, ADD_TRANSACTION } from "../actions";
function daysInMonth(month: any, year: any) {
  return new Date(year, month, 0).getDate();
}

export function* getTransactionsSaga(): any {
  const { userId, date } = (yield take(GET_TRANSACTIONS)).params;
  console.log("userId:", userId);
  console.log("date:", date.getMonth());
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  console.log("first date:", firstDay);
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    daysInMonth(date.getMonth() + 1, date.getFullYear()),
    23,
    59,
    59
  );
  console.log("last date:", lastDay);
  try {
    //API call to get transactions
    const { data } = yield call(listTransactions, userId, firstDay, lastDay);
    console.log("trans result:", data);
    const transactions = data;
    yield put(setTransactions(transactions));
  } catch (error) {
    console.log("err: ", error);
  }
}

function* worker(payload: any): any {
  const { transaction, userId } = payload.transaction;
  console.log("payload: ", payload);
  try {
    //API call to add transactions
    const { id } = (yield call(createTransaction, transaction, userId)).data;
    console.log("transaction id: ", id);
    const transactions = (yield select(transactionsSelector)).toJS();
    transactions.unshift(transaction);
    yield put(setTransactions(transactions));
  } catch (error) {
    console.log("err: ", error);
  }
}

export function* addTransactionSaga(): any {
  yield takeEvery(ADD_TRANSACTION, worker);
}
