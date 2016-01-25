var u = require('react-addons-update')

export var u

export function debounce(delay, fn) {
  var timer = null;
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(...args)
    }, delay)
  }
}

export function debounceCountdown(delay, interval, progressFn, fn) {
  var miniDelay = delay/interval
  var timer = null

  var stopFn = function() {
    clearTimeout(timer)
  }

  return function (...args) {
    clearTimeout(timer)
    var countdown = delay
    var timeoutFn = function() {
      countdown -= miniDelay
      if (countdown <= 0) {
        countdown = 0
        progressFn(0)
        fn.apply(...args)
      }
      else {
        progressFn(countdown/delay)
        timer = setTimeout(timeoutFn, miniDelay)
      }
    }
    timeoutFn()
    return stopFn
  }
}

export function partial(fun, ...args) {
  return (...args2)=>fun(...args, ...args2)
}

export function loopNumber(i, val, array) {
  let len = array.length
  i += val
  if (i < 0) {
    return len+i
  }
  else if (i >= len) {
    return i-len
  }
  else {
    return i
  }
}

export function elementOffsetTop(el) {
  let offset = 0
  while (el) {
    offset += el.offsetTop
    el = el.offsetParent
  }
  return offset
}

export function elementOffsetLeft(el) {
  let offset = 0
  while (el) {
    offset += el.offsetLeft
    el = el.offsetParent
  }
  return offset
}

export function merge(from, to) {
  let result = {}
  for (let n in from) {
    result[n] = from[n]
  }
  for (let n in to) {
    result[n] = to[n]
  }
  return result
}

export function snapTo(val, snap) {
  let valr = val % snap
  return valr > snap/2 ? (val - valr + snap) : (val - valr)
}
