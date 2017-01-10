import update from 'immutability-helper'

export var u = update

export function loopNumber (i, val, array) {
  let len = array.length
  i += val
  if (i < 0) {
    return len + i
  } else if (i >= len) {
    return i - len
  } else {
    return i
  }
}

export function snapTo (val, snap) {
  let valr = val % snap
  return valr > snap / 2 ? (val - valr + snap) : (val - valr)
}
