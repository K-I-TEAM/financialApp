import { createReducer } from "../utility";
import { fromJS } from "immutable";
import { SET_LOADING } from "../actions";
type ActionType = {
  loading: Boolean;
};
export const loading = createReducer(null, {
  [SET_LOADING](state: Object, { loading }: ActionType) {
    return fromJS(loading);
  },
});
