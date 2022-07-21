import { fromJS } from "immutable";
// TODO... finalize value list
const defaultUserState = {
  isAuthenticated: false,
  user: {
    id: null as string | null,
    email: null as string | null,
    name: null as string | null,
    family_name: null as string | null,
    phone_number: null as string | null,
    birthdate: null as string | null,
    picture_url: null as string | null,
    gender: "male" as GenderType,
    slug: null as string | null,
    categories: [] as Array<CategoryType>,
  },

  isLoading: true,
};
const defaultAccountState = {
  balance: 0 as number,
  spent: 0 as number,
  currentDate: new Date(),
  transactions: null as Array<TransactionType> | null,
  transactionsByCategory: null as Array<TransactionType> | null,
};
const defaultErrorState = {
  error: null as Object | string | null,
};
export const defaultState = fromJS({
  ...defaultUserState,
  ...defaultAccountState,
  ...defaultErrorState,
});

export type ErrorType = typeof defaultErrorState;
export type DefaultStateType = typeof defaultState | null;
export type GenderType = "female" | "male";
export type TransactionType = {
  id?: string;
  date: Date;
  description: string;
  type: TransactionTypeType;
  amount: number;
  category: string | null;
};
export type TransactionTypeType = "expense" | "income";
export type CategoryType = {
  id?: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
};
export type UserType = typeof defaultUserState.user;
