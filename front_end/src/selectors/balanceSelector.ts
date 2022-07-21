import { createSelector } from "reselect";
import { AppStateType } from "../combineReducers";
export const balanceSelector = createSelector(
  (state: AppStateType) => state.get(`balance`),
  (balance) => balance
);
