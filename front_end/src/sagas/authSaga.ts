import { take, put, call, delay } from "redux-saga/effects";

import Auth from "./../store/user/auth";
import data from "./../dummyData.json";
import {
  SIGN_IN,
  setUser,
  setIsAuthenticated,
  SIGN_OUT,
  setIsLoading,
} from "../actions";
import { CategoryType } from "../defaultState";

export function* authSaga(): any {
  yield take(SIGN_IN);
  yield put(setIsLoading(true));
  try {
    const user = yield call([Auth, "currentUserInfo"]);
    // Here should be API call to get categories from DB
    yield delay(1000);
    const categories: Array<CategoryType> = data.categories;
    yield put(
      setUser({
        email: user.attributes.email,
        name: user.attributes.name,
        categories,
      })
    );
    yield put(setIsAuthenticated(true));
  } catch (error) {
    console.log("err: ", error);
    yield put(setIsAuthenticated(false));
    yield put(setUser({ email: null, name: null }));
  }
  yield put(setIsLoading(false));
}

export function* signOutSaga(): any {
  yield take(SIGN_OUT);
  try {
    yield call([Auth, "signOut"]);
    yield put(setIsAuthenticated(false));
    yield put(setUser({ email: null, name: null }));
  } catch (err) {
    console.log(err);
  }
}
