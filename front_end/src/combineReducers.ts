import * as reducers from "./reducers";
import { fromJS } from "immutable";
import { DefaultStateType } from "./defaultState";

export const combineReducers = (config: any) => {
  const defaultState: DefaultStateType = fromJS(
    Object.keys(config).reduce((a: any, key) => {
      a[key] = config[key](undefined, []);
      return a;
    }, {})
  );
  return (state: DefaultStateType = defaultState, action: any) => {
    return Object.keys(config).reduce((state: any, key) => {
      const reducer = config[key];
      const previousState = state.get(key);
      const newValue = reducer(previousState, action);
      if (newValue === undefined) {
        throw new Error(
          `A reducer returned undefined when reducing key::"${key}"`
        );
      }
      return state.set(key, newValue);
    }, state);
  };
};
export type ReducerType = typeof reducer;
export type AppStateType = ReturnType<ReducerType>;
export const reducer = combineReducers(reducers);
