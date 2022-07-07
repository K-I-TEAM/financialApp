import { AxiosPromise } from "@aws-amplify/storage/node_modules/axios";
import { AxiosObject } from "./axiosObject ";

export const getUserId = (email: string): AxiosPromise<Object> => {
  return AxiosObject.get(`/users/${email}`);
};
