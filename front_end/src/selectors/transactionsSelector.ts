import { createSelector } from "reselect";
import { AppStateType } from "../combineReducers";

export const transactionsSelector = createSelector(
  (state: AppStateType) => state.get(`transactions`),
  (transactions) => transactions
);

export const transactionSelector = (id: string) => (state: AppStateType) => {
  const transactions = transactionsSelector(state);
  if (
    transactions &&
    transactions
      .filter((transaction: any) => transaction.toJS().id === id)
      .toJS().length
  ) {
    return transactions
      .filter((transaction: any) => transaction.toJS().id === id)
      .toJS()[0];
  } else {
    return null;
  }
};

export const transactionsByCategorySelector = createSelector(
  (state: AppStateType) => state.get(`transactionsByCategory`),
  (transactionsByCategory) => transactionsByCategory
);
