import { createSelector } from "reselect";
import { AppStateType } from "../combineReducers";
export const currentDateSelector = createSelector(
  (state: AppStateType) => state.get(`currentDate`),
  (currentDate) => currentDate
);
