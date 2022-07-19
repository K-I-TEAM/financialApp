import { createReducer } from "../utility";
import { fromJS } from "immutable";
import { SET_ERROR } from "../actions";
import { AppStateType } from "../combineReducers";
import { ErrorType } from "../defaultState";
type ActionType = {
  error: ErrorType;
};
export const error = createReducer(null, {
  [SET_ERROR](state: AppStateType, { error }: ActionType) {
    return fromJS(error);
  },
});
