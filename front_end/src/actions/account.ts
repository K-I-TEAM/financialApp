import { makeActionCreator } from "../utility";

export const SET_CURRENTDATE = "SET_CURRENTDATE";
export const setCurrentDate = makeActionCreator(SET_CURRENTDATE, "currentDate");

export const SET_BALANCE = "SET_BALANCE";
export const setBalance = makeActionCreator(SET_BALANCE, "balance");
