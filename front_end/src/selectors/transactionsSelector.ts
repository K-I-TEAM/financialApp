import { createSelector } from "reselect";
import { AppStateType } from "../combineReducers";
export const transactionsSelector = createSelector(
  (state: AppStateType) => state.get(`transactions`),
  (transactions) => transactions
);

export const transactionSelector = (id: string) => (state: AppStateType) => {
  const transactions = transactionsSelector(state);
  console.log("transactions: ", transactions);
  console.log("id: ", id);
  if (id) {
    console.log(
      "filter: ",
      transactions
        .filter((transaction: any) => transaction.toJS().id === id)
        .toJS()
    );
  }
  if (
    transactions &&
    transactions
      .filter((transaction: any) => transaction.toJS().id === id)
      .toJS().length
  ) {
    console.log(
      "tra: ",
      transactions
        .filter((transaction: any) => transaction.toJS().id === id)
        .toJS()[0]
    );
    return transactions
      .filter((transaction: any) => transaction.toJS().id === id)
      .toJS()[0];
  } else {
    return null;
  }
};
