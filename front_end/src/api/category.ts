import { AxiosPromise } from "@aws-amplify/storage/node_modules/axios";
import { AxiosObject } from "./axiosObject ";
import { CategoryType } from "../defaultState";

export const listCategory = (userId: string): AxiosPromise<CategoryType[]> => {
  return AxiosObject.get("/categories", {
    params: {
      userId,
    },
  });
};
export const createCategory = (
  category: CategoryType,
  userId: string
): AxiosPromise<CategoryType[]> => {
  return AxiosObject.post("/categories", { ...category, userId });
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
type BalanceByCategoryType = {
  balance: number;
};
export const getBalanceByCategory = (
  data: Object
): AxiosPromise<BalanceByCategoryType> => {
  return AxiosObject.get("/categoryBalance", { params: data });
};
