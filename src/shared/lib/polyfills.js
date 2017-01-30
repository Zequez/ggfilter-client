require('es6-promise').polyfill()
const objectValues = require('object.values')

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function (predicate) {
      'use strict'
      if (this == null) {
        throw new TypeError('Array.prototype.find called on null or undefined')
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function')
      }

      let thisArg = arguments[1]
      let value
      this.some(function (val, i) {
        value = val
        return predicate.call(thisArg, val, i, this)
      })
      return value
    }
  })
}

if (!Object.values) {
  objectValues.shim()
}
