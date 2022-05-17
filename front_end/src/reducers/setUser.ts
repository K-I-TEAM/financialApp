import { createReducer } from "../utility";
import { fromJS } from "immutable";
import { SET_USER } from "../actions";
import { AppStateType } from "../combineReducers";
type ActionType = {
  user: Object;
};
export const setUser = createReducer(null, {
  [SET_USER](state: AppStateType, { user }: ActionType) {
    return fromJS(user);
  },
});
