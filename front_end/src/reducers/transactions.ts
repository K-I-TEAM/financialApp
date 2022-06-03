import { createReducer } from "../utility";
import { fromJS } from "immutable";
import { SET_TRANSACTIONS } from "../actions";
import { AppStateType } from "../combineReducers";
import { TransactionType } from "../defaultState";
type ActionType = {
  transactions: Array<TransactionType>;
};
export const transactions = createReducer(null, {
  [SET_TRANSACTIONS](state: AppStateType, { transactions }: ActionType) {
    return fromJS(transactions);
  },
});
