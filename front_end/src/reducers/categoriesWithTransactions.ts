import { createReducer } from "../utility";
import { fromJS } from "immutable";
import { SET_CATEGORIES_WITH_TRANSACTIONS } from "../actions";
import { AppStateType } from "../combineReducers";
type ActionType = {
  categories: Object;
};
export const transactions = createReducer(null, {
  [SET_CATEGORIES_WITH_TRANSACTIONS](
    state: AppStateType,
    { categories }: ActionType
  ) {
    return fromJS(categories);
  },
});
