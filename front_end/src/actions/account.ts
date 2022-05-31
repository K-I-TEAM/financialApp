import { makeActionCreator } from "../utility";

export const SET_CURRENTDATE = "SET_CURRENTDATE";
export const setCurrentDate = makeActionCreator(SET_CURRENTDATE, "currentDate");
