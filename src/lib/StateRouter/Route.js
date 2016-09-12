const UrlPattern = require('url-pattern')
import StatePattern from './StatePattern'

export default class Route {
  path = null
  pattern = null
  statePattern = null
  stateShard = null
  stateExtract = null
  actions = []

  constructor (path, stateShard, actions, stateExtract) {
    this.path = path
    this.stateShard = stateShard
    this.actions = actions
    this.stateExtract = stateExtract
    this.pattern = new UrlPattern(path)
    this.statePattern = new StatePattern(stateShard, this.pattern.names)
  }

  matchRoute (path, query) {
    return this.pattern.match(path)
  }

  matchState (state) {
    let match = this.statePattern.match(state)
    if (this.stateExtract) match = {...match, ...this.stateExtract(state)}
    return match
  }

  stringify (...params) {
    if (typeof params[0] === 'object') {
      params = params[0]
    } else if (params.length) {
      if (params.length === 1 && params[0] instanceof Array) {
        params = params[0]
      }
      let newParams = {}
      for (let i = 0; i < params.length; ++i) {
        newParams[this.pattern.names[i]] = params[i]
      }
      params = newParams
    } else {
      params = {}
    }
    return this.pattern.stringify(params)
  }
}
