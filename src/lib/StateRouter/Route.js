import UrlPattern from 'url-pattern'
import StatePattern from './StatePattern'

export function multiConstructor (routesList = []) {
  let routes = []
  let routesByName = {}

  function construct ([path, stateShard, actions, stateExtract], name) {
    let route = new Route(path, stateShard, actions, stateExtract, name)
    routes.push(route)
    if (name) {
      routesByName[name] = route
    }
  }

  if (routesList instanceof Array) {
    routesList.forEach((r) => {
      construct(r)
    })
  } else {
    for (let name in routesList) {
      construct(routesList[name], name)
    }
  }

  return [routes, routesByName]
}

export default class Route {
  name = null
  path = null
  pattern = null
  statePattern = null
  stateShard = null
  stateExtract = null
  actions = []

  constructor (path, stateShard, actions, stateExtract, name) {
    this.name = name
    this.path = path
    this.stateShard = stateShard
    this.actions = actions.constructor !== Array ? [actions] : actions
    this.stateExtract = stateExtract
    this.pattern = new UrlPattern(path)
    this.statePattern = new StatePattern(stateShard, this.pattern.names)
  }

  matchRoute (path, query) {
    return this.pattern.match(path)
  }

  matchState (state, force) {
    let match = this.statePattern.match(state, force)
    if (match && this.stateExtract) match = {...match, ...this.stateExtract(state)}
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
