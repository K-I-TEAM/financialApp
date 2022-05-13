import { SagaMiddleware } from "@redux-saga/core";
import * as sagas from "./sagas";

export const initSagas = (sagaMiddleware: SagaMiddleware) => {
  Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};
