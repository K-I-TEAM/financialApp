import { createSelector } from "reselect";
import { AppStateType } from "../combineReducers";
export const isLoadingSelector = createSelector(
  (state: AppStateType) => state.get(`isLoading`),
  (isLoading) => isLoading
);
