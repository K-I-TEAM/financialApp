import { AxiosPromise } from "@aws-amplify/storage/node_modules/axios";
import { AxiosObject } from "./axiosObject ";
import { TransactionType } from "../defaultState";

export const listTransactions = (
  userId: string,
  startedDate: Date,
  endedDate: Date
): AxiosPromise<TransactionType[]> => {
  return AxiosObject.get("/transactions", {
    params: { userId, startedDate, endedDate },
  });
};

export const updateTransactions = (
  transaction: TransactionType
): AxiosPromise<TransactionType> => {
  return AxiosObject.put(`/transactions/${transaction.id}`, transaction);
};

export const createTransaction = (
  transaction: TransactionType,
  userId: string
): AxiosPromise<TransactionType> => {
  return AxiosObject.post("/transactions", { ...transaction, userId });
};

export const deleteTransaction = (id: string): AxiosPromise => {
  return AxiosObject.delete(`/transactions/${id}`);
};
