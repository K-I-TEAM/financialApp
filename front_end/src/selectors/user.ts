import { createSelector } from "reselect";
import { AppStateType } from "../combineReducers";
export const userSelector = createSelector(
  (state: AppStateType) => state.get(`user`),
  (user) => user
);
