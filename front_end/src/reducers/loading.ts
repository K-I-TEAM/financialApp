import { createReducer } from "../utility";
import { fromJS } from "immutable";
import { SET_LOADING } from "../actions";
import { AppStateType } from "../combineReducers";
type ActionType = {
  loading: Boolean;
};
export const loading = createReducer(null, {
  [SET_LOADING](state: AppStateType, { loading }: ActionType) {
    return fromJS(loading);
  },
});
