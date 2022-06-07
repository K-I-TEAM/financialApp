import { take, put, call, delay, select } from "redux-saga/effects";

import data from "./../dummyData.json";
import { transactionsSelector } from "./../selectors";

import { GET_TRANSACTIONS, setTransactions, ADD_TRANSACTION } from "../actions";

export function* getTransactionsSaga(): any {
  const { userId, date }: any = yield take(GET_TRANSACTIONS);
  try {
    //API call to get transactions
    yield delay(2500);
    const transactions = data.transactions;
    yield put(setTransactions(transactions));
  } catch (error) {
    console.log("err: ", error);
  }
}
export function* addTransactionSaga(): any {
  const { transaction }: any = yield take(ADD_TRANSACTION);
  console.log("transaction: ", transaction);
  try {
    //API call to add transactions
    yield delay(2500);
    const transactions = (yield select(transactionsSelector)).toJS();
    console.log("transactions before: ", transactions);
    transactions.unshift(transaction);
    console.log("transactions after: ", transactions);
    yield put(setTransactions(transactions));
  } catch (error) {
    console.log("err: ", error);
  }
}
