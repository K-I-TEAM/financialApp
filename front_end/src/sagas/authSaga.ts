import { take, put, call, delay, takeEvery, select } from "redux-saga/effects";

import Auth from "./../store/user/auth";
import {
  SIGN_IN,
  setUser,
  setIsAuthenticated,
  SIGN_OUT,
  setIsLoading,
  UPDATE_USER,
} from "../actions";
import { userSelector } from "../selectors";
import data from "./../dummyData.json";

export function* authSaga(): any {
  yield take(SIGN_IN);
  yield put(setIsLoading(true));
  try {
    const user = yield call([Auth, "currentUserInfo"]);
    //API call to get categories
    delay(1000);
    const categories = data.categories;
    yield put(
      setUser({
        email: user.attributes.email || "",
        name: user.attributes.name || "",
        family_name: user.attributes.family_name || "",
        birthdate: user.attributes.birthdate || "",
        gender: user.attributes.gender || "",
        phone_number: user.attributes.phone_number || "",
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

function* updateUserWorker(payload: any): any {
  const { user } = payload;
  try {
    const currentUser = yield call([Auth, "currentAuthenticatedUser"]);
    console.log("current us:", currentUser);
    yield call([Auth, "updateUserAttributes"], currentUser, user);
    const stateUser = yield select(userSelector);
    yield put(setUser({ ...stateUser, ...user }));
  } catch (err) {
    console.log(err);
  }
}

export function* updateUserSaga(): any {
  yield takeEvery(UPDATE_USER, updateUserWorker);
}
