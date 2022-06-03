import { createSelector } from "reselect";
import { AppStateType } from "../combineReducers";
export const transactionsSelector = createSelector(
  (state: AppStateType) => state.get(`transactions`).toJS(),
  (transactions) => transactions
);
