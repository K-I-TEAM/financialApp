import { take, put, call, delay, select, takeEvery } from "redux-saga/effects";

import data from "./../dummyData.json";
import { transactionsSelector } from "./../selectors";

import { GET_TRANSACTIONS, setTransactions, ADD_TRANSACTION } from "../actions";

export function* getTransactionsSaga(): any {
  const { userId, date }: any = yield take(GET_TRANSACTIONS);
  try {
    //API call to get transactions
    const transactions = data.transactions;
    yield put(setTransactions(transactions));
  } catch (error) {
    console.log("err: ", error);
  }
}

function* worker(payload: any): any {
  const { transaction } = payload;
  try {
    //API call to add transactions
    yield delay(2500);
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
