import { take, put, call, delay } from "redux-saga/effects";
import data from "./../dummyData.json";

import { GET_TRANSACTIONS, setTransactions } from "../actions";

export function* getTransactionsSaga(): any {
  const { userId, date }: any = yield take(GET_TRANSACTIONS);
  try {
    //API call to get transactions
    yield delay(1000);
    const transactions = data.transactions;
    yield put(setTransactions(transactions));
  } catch (error) {
    console.log("err: ", error);
  }
}
