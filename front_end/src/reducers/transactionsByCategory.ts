import { createReducer } from "../utility";
import { fromJS } from "immutable";
import { SET_TRANSACTIONS_BY_CATEGORY } from "../actions";
import { AppStateType } from "../combineReducers";
import { TransactionType } from "../defaultState";
type ActionType = {
  transactionsByCategory: Array<TransactionType>;
};
export const transactionsByCategory = createReducer(null, {
  [SET_TRANSACTIONS_BY_CATEGORY](
    state: AppStateType,
    { transactionsByCategory }: ActionType
  ) {
    return fromJS(transactionsByCategory);
  },
});
