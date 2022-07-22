import {
  TransactionType,
  CategoryType,
  TransactionTypeType,
} from "./defaultState";

export const calculateTransactions = (
  transactions: Array<TransactionType>,
  categories: Array<CategoryType>,
  transactionType: TransactionTypeType | null = null
) => {
  const newTransactions = transactionType
    ? transactions.filter((transaction) => transaction.type === transactionType)
    : transactions;
  const categoriesWithSum = categories.map((category) => {
    let total = 0;
    newTransactions.forEach((transaction) => {
      if (transaction.category === category.id) {
        total = total + transaction.amount;
      }
    });
    return { ...category, total };
  });
  const categoriesWithSumFiltered = categoriesWithSum.filter(
    (category) => category.total > 0
  );
  return categoriesWithSumFiltered;
};
export const getMonthYearDate = (date: Date) => {
  return date.toLocaleString("en-us", { month: "long", year: "numeric" });
};
export function daysInMonth(month: any, year: any) {
  return new Date(year, month, 0).getDate();
}
