export function loopNumber(i, val, array) {
  let len = array.length;
  i += val;
  if (i < 0) {
    return len + i;
  } else if (i >= len) {
    return i - len;
  } else {
    return i;
  }
}

export function snapTo(val, snap) {
  let valr = val % snap;
  return valr > snap / 2 ? (val - valr + snap) : (val - valr);
}

export function themeExtender<T extends {[key: string]: string}>(original: T, provided: T): T {
  let th: T;

  if (original !== provided) {
    th = Object.assign({}, original);
    for (let t in provided) {
      th[t] = th[t] + ' ' + provided[t];
    }
  } else {
    th = original;
  }

  return th;
}
