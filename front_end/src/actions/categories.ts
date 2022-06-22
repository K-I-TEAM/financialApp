import { makeActionCreator } from "../utility";

export const GET_CATEGORIES = "GET_CATEGORIES";
export const getCategories = makeActionCreator(GET_CATEGORIES);

export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const createCategory = makeActionCreator(CREATE_CATEGORY, "category");

export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const deleteCategory = makeActionCreator(DELETE_CATEGORY, "id");

export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const updateCategory = makeActionCreator(UPDATE_CATEGORY, "data");
