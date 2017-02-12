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

export function themeExtender (original, provided, extend = true) {
  let th = {}
  if (original !== provided && extend) {
    for (let t in original) {
      if (provided[t]) th[t] = original[t] + ' ' + provided[t]
      else th[t] = original[t]
    }
  } else {
    th = provided
  }

  return th
}
