import { createSelector } from "reselect";
import { AppStateType } from "../combineReducers";
export const isAuthenticatedSelector = createSelector(
  (state: AppStateType) => state.get(`isAuthenticated`),
  (isAuthenticated) => isAuthenticated
);
