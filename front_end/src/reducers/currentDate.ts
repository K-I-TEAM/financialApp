import { createReducer } from "../utility";
import { fromJS } from "immutable";
import { SET_CURRENTDATE } from "../actions";
import { AppStateType } from "../combineReducers";
type ActionType = {
  currentDate: Date;
};
export const currentDate = createReducer(null, {
  [SET_CURRENTDATE](state: AppStateType, { currentDate }: ActionType) {
    return fromJS(currentDate);
  },
});
