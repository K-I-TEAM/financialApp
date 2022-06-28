import { put, call, takeEvery, select } from "redux-saga/effects";
import {
  CREATE_CATEGORY,
  setUser,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from "../actions";

import Auth from "./../store/user/auth";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../api/category";
import { userSelector } from "../selectors";
import { CategoryType } from "../defaultState";

function* createCategoryWorker(payload: any): any {
  const { category } = payload;
  try {
    const currentUser = yield call([Auth, "currentAuthenticatedUser"]);
    console.log("current us:", currentUser);
    const { id } = (yield call(createCategory, category)).data;
    console.log("id", id);
    const stateUser = yield select(userSelector);
    yield put(
      setUser({
        ...stateUser,
        categories: [...stateUser.categories, { ...category, id }],
      })
    );
  } catch (err) {
    console.log(err);
  }
}

export function* createCategorySaga(): any {
  yield takeEvery(CREATE_CATEGORY, createCategoryWorker);
}

function* deleteCategoryWorker(payload: any): any {
  const { id } = payload;
  try {
    //console.log("current us:", currentUser);
    yield call(deleteCategory, id);
    console.log("id", id);
    const stateUser = yield select(userSelector);
    const newCategoryArray = [...stateUser.categories].filter(
      (category) => category.id !== id
    );
    yield put(
      setUser({
        ...stateUser,
        categories: newCategoryArray,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

export function* deleteCategorySaga(): any {
  yield takeEvery(DELETE_CATEGORY, deleteCategoryWorker);
}

function* updateCategoryWorker(payload: any): any {
  const { category, id } = payload.data;
  try {
    yield call(updateCategory, category, id);
    const stateUser = yield select(userSelector);
    const newCategories = stateUser.categories.map((cat: CategoryType) => {
      if (cat.id === id) {
        return { ...cat, ...category };
      } else return cat;
    });
    yield put(
      setUser({
        ...stateUser,
        categories: newCategories,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

export function* updateCategorySaga(): any {
  yield takeEvery(UPDATE_CATEGORY, updateCategoryWorker);
}
