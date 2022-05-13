import { take } from "redux-saga/effects";

import { GET_TEST_INFO } from "./../actions";

export function* testSaga() {
  yield take(GET_TEST_INFO);
}
