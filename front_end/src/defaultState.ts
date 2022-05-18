import { fromJS } from "immutable";
// TODO... finalize value list
export const defaultState = fromJS({
  isAuthenticated: false,
  user: {
    email: null as string | null,
    name: null as string | null,
  },
  isLoading: true,
});
export type DefaultStateType = typeof defaultState | null;
