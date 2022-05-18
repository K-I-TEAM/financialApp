import { DefaultStateType } from "../defaultState";

export const createReducer = (
  initialState: DefaultStateType,
  handlers: any
) => {
  return function reducer(state: DefaultStateType = initialState, action: any) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};
