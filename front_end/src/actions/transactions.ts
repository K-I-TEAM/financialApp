import { makeActionCreator } from "../utility";

export const GET_TRANSACTIONS = "GET_TRANSACTIONS";
export const getTransactions = makeActionCreator(GET_TRANSACTIONS, "params");

export const SET_TRANSACTIONS = "SET_TRANSACTIONS";
export const setTransactions = makeActionCreator(
  SET_TRANSACTIONS,
  "transactions"
);
export const ADD_TRANSACTION = "ADD_TRANSACTION";
export const addTransaction = makeActionCreator(ADD_TRANSACTION, "transaction");
