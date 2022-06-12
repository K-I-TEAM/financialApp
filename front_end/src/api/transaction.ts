import { AxiosPromise } from "@aws-amplify/storage/node_modules/axios";
import { AxiosObject } from "./axiosObject ";
import { TransactionType } from "../defaultState";

export const listTransactions = (): AxiosPromise<TransactionType[]> => {
  return AxiosObject.get("/transactions", {
    params: { startedDate: Date, endedDate: Date },
  });
};
export const UpdateTransactions = (
  transaction: TransactionType
): AxiosPromise<TransactionType> => {
  return AxiosObject.put(`/transactions/:${transaction.id}`, transaction);
};
