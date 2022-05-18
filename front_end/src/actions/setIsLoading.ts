import { makeActionCreator } from "../utility";
export const SET_ISLOADING = "SET_ISLOADING";
export const setIsLoading = makeActionCreator(SET_ISLOADING, "isLoading");
