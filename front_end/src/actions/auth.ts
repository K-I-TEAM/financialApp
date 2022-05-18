import { makeActionCreator } from "../utility";

export const SIGN_IN = "SIGN_IN";
export const signIn = makeActionCreator(SIGN_IN);

export const SIGN_OUT = "SIGN_OUT";
export const signOut = makeActionCreator(SIGN_OUT);

export const SET_ISAUTHENTICATED = "SET_ISAUTHENTICATED";
export const setIsAuthenticated = makeActionCreator(
  SET_ISAUTHENTICATED,
  "isAuthenticated"
);

export const SET_USER = "SET_USER";
export const setUser = makeActionCreator(SET_USER, "user");
