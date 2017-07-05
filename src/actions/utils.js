/*

E.g. makeAction("type", "argument1", "argument2", ...)

Returns function(type, argument1, argument2, ...) {
  return {
    "type": type,
    "argument1": argument1,
    "argument2": argument2,
    ...
  }
}

 */
export function makeAction(type, ...argNames) {
  return function(...args) {
    let action = { type }
    argNames.forEach((argName, index) => {
      if (argName === "type") {
        throw new Error("action creator was asked to override type");
      }
      action[argName] = args[index];
    })
    return action
  }
}
