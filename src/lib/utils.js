import update from 'react-addons-update'

export var u = update

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

export function timeInWords (time) {
  let timespans = [
    [1, 'second'],
    [60, 'minute'],
    [60 * 60, 'hour'],
    [60 * 60 * 24, 'day'],
    [60 * 60 * 24 * 7, 'week'],
    [60 * 60 * 24 * 30, 'month'],
    [60 * 60 * 24 * 365, 'year']
  ]

  return timeInWordsFromTimespans(time, timespans)
}

export function timeInWordsFromTimespans (time, timespans) {
  let span = timespans[0]
  if (time >= span[0] && time < span[0] * 2) {
    return `1 ${span[1]}`
  } else if (timespans.length === 1 || (time > span[0] && time < timespans[1][0])) {
    return `${Math.floor(time / span[0])} ${span[1]}s`
  }

  timespans.shift()

  return timeInWordsFromTimespans(time, timespans)
}

export function escapeHtml (unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
