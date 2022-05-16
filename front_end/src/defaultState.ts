import { fromJS } from "immutable";
// TODO... finalize value list
export const defaultState = fromJS({
  testArray: ["Kate", "Yuri", "Maria"],
  loading: true,
});
export type DefaultStateType = typeof defaultState | null;
