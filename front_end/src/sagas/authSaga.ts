import { take, put } from "redux-saga/effects";
import Auth from "./../store/user/auth";
//import { CognitoUser } from "@aws-amplify/auth";

import { SIGN_IN, setUser, setIsAuthenticated } from "../actions";
type CognitoUserInfoType = {
  attributes: UserType;
};

type UserType = {
  email: string | null;
  name: string | null;
};

export function* authSaga() {
  yield take(SIGN_IN);
  console.log("auth saga");
  try {
    //const user: CognitoUser = yield Auth.currentAuthenticatedUser();
    const u: CognitoUserInfoType = yield Auth.currentUserInfo();
    yield put(setUser({ email: u.attributes.email, name: u.attributes.name }));
    yield put(setIsAuthenticated(true));
  } catch (error) {
    console.log("err: ", error);
  }
}
