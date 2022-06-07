import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
//import { applyMiddleware } from "redux";
import { initSagas } from "./initSagas";
import { defaultState } from "./defaultState";
import { reducer } from "./combineReducers";

export const getStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleWares = [sagaMiddleware];
  //const composables = [applyMiddleware(...middleWares)];
  const store = configureStore({
    reducer,
    middleware: middleWares,
    devTools: process.env.NODE_ENV !== "production",
    preloadedState: defaultState,
    //  enhancers: composables,
  });
  console.log("Saga middleware implemented!");
  initSagas(sagaMiddleware);
  return store;
};
