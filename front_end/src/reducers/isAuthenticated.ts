import { createReducer } from "../utility";
import { fromJS } from "immutable";
import { SET_ISAUTHENTICATED } from "../actions";
import { AppStateType } from "../combineReducers";
type ActionType = {
  isAuthenticated: Boolean;
};
export const isAuthenticated = createReducer(null, {
  [SET_ISAUTHENTICATED](state: AppStateType, { isAuthenticated }: ActionType) {
    return fromJS(isAuthenticated);
  },
});
