import { AxiosPromise } from "@aws-amplify/storage/node_modules/axios";
import { AxiosObject } from "./axiosObject ";
import { CategoryType } from "../defaultState";

export const listCategory = (): AxiosPromise<CategoryType[]> => {
  return AxiosObject.get("/categories");
};
export const createCategory = (
  category: CategoryType
): AxiosPromise<CategoryType[]> => {
  return AxiosObject.post("/categories", category);
};
export const updateCategory = (
  category: CategoryType,
  id: string
): AxiosPromise<CategoryType[]> => {
  return AxiosObject.put(`/categories/${id}`, category);
};
export const deleteCategory = (id: string): AxiosPromise<void> => {
  return AxiosObject.delete(`/categories/${id}`);
};
