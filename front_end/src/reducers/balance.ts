import { createReducer } from "../utility";
import { fromJS } from "immutable";
import { SET_BALANCE } from "../actions";
import { AppStateType } from "../combineReducers";
type ActionType = {
  balance: number;
};
export const balance = createReducer(null, {
  [SET_BALANCE](state: AppStateType, { balance }: ActionType) {
    return fromJS(balance);
  },
});
