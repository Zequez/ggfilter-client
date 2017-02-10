import update from 'immutability-helper'

export var u = update

u.extend('$toggle', ([item, val], arr) => {
  let i = arr.indexOf(item)
  if ((i === -1 && !val) || (i !== -1 && val)) return arr
  if (val) {
    return arr.concat(item)
  } else {
    arr = arr.concat([])
    arr.splice(i, 1)
    return arr
  }
})

u.extend('$delete', (key, obj) => {
  obj = { ...obj }
  delete obj[key]
  return obj
})

export const createReducer =
  (initialState, reducers) =>
  (state = initialState, action) =>
    reducers[action.type]
      ? reducers[action.type](state, action.payload, action)
      : state
