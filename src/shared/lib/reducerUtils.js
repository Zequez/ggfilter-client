export function createBasicAction (actionConst, ...paramsNames) {
  return function (...args) {
    let action = { type: actionConst }
    paramsNames.forEach((name, i) => { action[name] = args[i] })
    return action
  }
}

export function createHashReducer (hash, initialState) {
  return function (state = initialState, action) {
    if (hash.hasOwnProperty(action.type)) {
      return hash[action.type](state, action)
    } else {
      return state
    }
  }
}
