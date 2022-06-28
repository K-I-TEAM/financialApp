import { AxiosPromise } from "@aws-amplify/storage/node_modules/axios";
import { AxiosObject } from "./axiosObject ";

export const createUser = (user: Object): AxiosPromise<Object> => {
  return AxiosObject.post("/users", user);
};
