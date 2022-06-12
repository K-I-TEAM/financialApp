import { AxiosPromise } from "@aws-amplify/storage/node_modules/axios";
import { AxiosObject } from "./axiosObject ";
import { CategoryType } from "../defaultState";

export const listCategory = (): AxiosPromise<CategoryType[]> => {
  return AxiosObject.get("/categories");
};
