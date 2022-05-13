export const makeActionCreator = (type: any, ...argNames: any) => {
  return function (...args: any) {
    let action: any = { type };
    argNames.forEach((arg: any, index: any) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
};
