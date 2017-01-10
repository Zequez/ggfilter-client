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
