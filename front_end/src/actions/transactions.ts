import { makeActionCreator } from "../utility";

export const GET_TRANSACTIONS = "GET_TRANSACTIONS";
export const getTransactions = makeActionCreator(GET_TRANSACTIONS);

export const SET_TRANSACTIONS = "SET_TRANSACTIONS";
export const setTransactions = makeActionCreator(
  SET_TRANSACTIONS,
  "transactions"
);

export const ADD_TRANSACTION = "ADD_TRANSACTION";
export const addTransaction = makeActionCreator(ADD_TRANSACTION, "transaction");

export const UPDATE_TRANSACTION = "UPDATE_TRANSACTION";
export const updateTransaction = makeActionCreator(
  UPDATE_TRANSACTION,
  "transaction"
);

export const DELETE_TRANSACTION = "DELETE_TRANSACTION";
export const deleteTransaction = makeActionCreator(
  DELETE_TRANSACTION,
  "transaction"
);

export const SET_TRANSACTIONS_BY_CATEGORY = "SET_TRANSACTIONS_BY_CATEGORY";
export const setTransactionsByCategory = makeActionCreator(
  SET_TRANSACTIONS_BY_CATEGORY,
  "transactionsByCategory"
);

export const GET_TRANSACTIONS_BY_CATEGORY = "GET_TRANSACTIONS_BY_CATEGORY";
export const getTransactionsByCategory = makeActionCreator(
  GET_TRANSACTIONS_BY_CATEGORY,
  "categoryId"
);
