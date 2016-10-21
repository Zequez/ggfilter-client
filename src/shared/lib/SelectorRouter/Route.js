import UrlPattern from 'url-pattern'

export default class Route {
  name = null
  path = null
  selectors = []
  actions = []
  children = []

  constructor (name, path, selectors, actions, children) {
    this.name = name
    this.path = path
    this.selectors = selectors
    this.actions = actions
    this.pathPattern = new UrlPattern(this.path, {segmentValueCharset: 'a-zA-Z0-9_+-'})
    this.children = children // Doesn't do anything yet
  }

  matchPath (path) {
    let matches = this.pathPattern.match(path)
    return matches
      ? this.createActions(Object.values(matches))
      : null
  }

  matchState (state, force = false) {
    let matches = []

    let iterate = ([selector, matcher]) => {
      let value = selector(state)
      let newValue = value
      if (typeof matcher === 'function') {
        newValue = matcher(value)
      } else if (matcher !== undefined) {
        newValue = value === matcher
      }
      matches.push(newValue)
      return newValue
    }

    let matched = true
    if (force) {
      this.selectors.forEach(iterate)
    } else {
      matched = this.selectors.every(iterate)
    }

    if (matched) {
      return this.stringifyArray(matches)
    } else {
      return null
    }
  }

  stringify (...params) {
    return typeof params[0] === 'object'
      ? this.pathPattern.stringify(params[0])
      : this.stringifyArray(params)
  }

  stringifyArray (values) {
    if (!values.length) return this.pathPattern.stringify()
    let obj = {}
    let names = this.pathPattern.names
    values = values.slice(-names.length)
    names.forEach((name, i) => obj[name] = values[i])
    return this.pathPattern.stringify(obj)
  }

  createActions (values) {
    return this.actions.map((action) => (
      (typeof action === 'object')
        ? action
        : action(...values)
    ))
  }
}
