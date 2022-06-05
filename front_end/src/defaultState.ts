import { fromJS } from "immutable";
// TODO... finalize value list
const defaultUserState = {
  isAuthenticated: false,
  user: {
    email: null as string | null,
    name: null as string | null,
    surname: null as string | null,
    telephone: null as string | null,
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
};
export const defaultState = fromJS({
  ...defaultUserState,
  ...defaultAccountState,
});

export type DefaultStateType = typeof defaultState | null;
export type GenderType = "female" | "male";
export type TransactionType = {
  date: Date;
  description: string;
  type: TransactionTypeType;
  amount: number;
  categoryId: string | null;
};
export type TransactionTypeType = "expense" | "income";
export type CategoryType = {
  id: string;
  name: string;
  description?: string;
  colour: string;
  icon: string;
};
