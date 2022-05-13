import { compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { initSagas } from "./initSagas";
import { defaultState } from "./defaultState";
import { reducer } from "./combineReducers";

export const getStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleWares = [sagaMiddleware];
  //const composables = [applyMiddleware(...middleWares)];
  const composeEnhancers =
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  // const enhancer = composeEnhancers(...composables);
  const store = configureStore({
    reducer,
    middleware: middleWares,
    devTools: process.env.NODE_ENV !== "production",
    preloadedState: defaultState,
    enhancers: composeEnhancers,
  });
  console.log("Saga middleware implemented!");
  initSagas(sagaMiddleware);
  return store;
};
