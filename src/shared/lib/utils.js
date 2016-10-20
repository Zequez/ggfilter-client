import update from 'react-addons-update'

export var u = update

export function debounce (delay, fn) {
  var timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(...args)
    }, delay)
  }
}

export function debounceCountdown (delay, interval, progressFn, fn) {
  var miniDelay = delay / interval
  var timer = null

  var stopFn = function () {
    clearTimeout(timer)
  }

  return function (...args) {
    clearTimeout(timer)
    var countdown = delay
    var timeoutFn = function () {
      countdown -= miniDelay
      if (countdown <= 0) {
        countdown = 0
        progressFn(0)
        fn.apply(...args)
      } else {
        progressFn(countdown / delay)
        timer = setTimeout(timeoutFn, miniDelay)
      }
    }
    timeoutFn()
    return stopFn
  }
}

export function partial (fun, ...args) {
  return (...args2) => fun(...args, ...args2)
}

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

export function elementOffsetTop (el) {
  let offset = 0
  while (el) {
    offset += el.offsetTop
    el = el.offsetParent
  }
  return offset
}

export function elementOffsetLeft (el) {
  let offset = 0
  while (el) {
    offset += el.offsetLeft
    el = el.offsetParent
  }
  return offset
}

export function merge (from, to) {
  let result = {}
  for (let n in from) {
    result[n] = from[n]
  }
  for (let n in to) {
    result[n] = to[n]
  }
  return result
}

export function snapTo (val, snap) {
  let valr = val % snap
  return valr > snap / 2 ? (val - valr + snap) : (val - valr)
}

export function timeAgo (date) {
  return timeInWords((new Date().valueOf() - date.valueOf()) / 1000)
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
  return unsafe.toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function parseQuery (search) {
  let args = search.substring(1).split('&')
  let argsParsed = {}
  let i, arg, kvp, key, value
  for (i = 0; i < args.length; i++) {
    arg = args[i]
    if (arg.indexOf('=') === -1) {
      argsParsed[decodeURIComponent(arg).trim()] = true
    } else {
      kvp = arg.split('=')
      key = decodeURIComponent(kvp[0]).trim()
      value = decodeURIComponent(kvp[1]).trim()
      argsParsed[key] = value
    }
  }
  return argsParsed
}

export function camelizeKeys (obj) {
  if (obj instanceof Array) {
    let camelizedArr = []
    for (let i = 0; i < obj.length; ++i) {
      camelizedArr.push(camelizeKeys(obj[i]))
    }
    return camelizedArr
  } else {
    let camelizedObj = {}
    for (let k in obj) {
      camelizedObj[camelCase(k)] = obj[k]
    }
    return camelizedObj
  }
}

export function camelCase (snakeCase) {
  return snakeCase.replace(/(_\w)/g, (m) => m[1].toUpperCase())
}

export function snakeizeKeys (obj, recursive = true) {
  let snakeizedObj = {}
  for (let k in obj) {
    let key = snakeCase(k)
    let val = obj[k]
    if (recursive) {
      if (obj[k] instanceof Object && !(val instanceof Array)) {
        val = snakeizeKeys(val, recursive)
      }
    }
    snakeizedObj[key] = val
  }
  return snakeizedObj
}

export function snakeCase (camelCase) {
  return camelCase.replace(/[A-Z]+/g, (m) => '_' + m.toLowerCase())
}

export function objectMatchesExtension (main, extension, deep = true) {
  for (let key in extension) {
    if (deep && typeof main[key] === 'object') {
      if (!objectMatchesExtension(main[key], extension[key])) return false
    } else {
      if (main[key] !== extension[key]) return false
    }
  }
  return true
}

export function isEmpty (obj) {
  for (let key in obj) {
    return false
  }
  return true
}
