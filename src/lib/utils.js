export function debounce(delay, fn) {
  var timer = null;
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(...args)
    }, delay)
  }
}
