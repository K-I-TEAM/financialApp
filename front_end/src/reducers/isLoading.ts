import { createReducer } from "../utility";
import { fromJS } from "immutable";
import { SET_ISLOADING } from "../actions";
import { AppStateType } from "../combineReducers";
type ActionType = {
  isLoading: Boolean;
};
export const isLoading = createReducer(null, {
  [SET_ISLOADING](state: AppStateType, { isLoading }: ActionType) {
    return fromJS(isLoading);
  },
});
