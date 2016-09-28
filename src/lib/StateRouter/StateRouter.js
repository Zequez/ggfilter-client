import _values from 'lodash/values'
import qs from 'qs'
import Route from './Route'

export default class StateRouter {
  routes = []
  routesByName = {}
  store = null
  history = null
  location = {}

  constructor (routesList = []) {
    if (routesList instanceof Array) {
      routesList.forEach((r) => {
        this._addRoute(r)
      })
    } else {
      for (let name in routesList) {
        this._addRoute(routesList[name], name)
      }
    }
  }

  bind (store, history) {
    this.store = store
    this.history = history
    let promise = this._bindHistory()
    this._bindStore()
    return promise
  }

  url (name, ...params) {
    let route = this.routesByName[name]
    if (route) {
      return route.stringify(...params)
    }
  }

  urlGen (name) {
    let route = this.routesByName[name]
    if (route) {
      let params = route.matchState(this.store.getState(), true)
      return route.stringify(params)
    }
  }

  route (name) {
    return this.routesByName[name]
  }

  _parseDumbLocation (dumbLocation) {
    return {
      pathname: dumbLocation.pathname,
      search: dumbLocation.search,
      query: qs.parse(dumbLocation.search),
      hash: dumbLocation.hash
    }
  }

  _addRoute ([path, stateShard, actions, stateExtract], name) {
    if (actions.constructor !== Array) actions = [actions]
    let route = new Route(path, stateShard, actions, stateExtract)
    this.routes.push(route)
    if (name) {
      this.routesByName[name] = route
    }
  }

  _bindHistory () {
    this.location = this._parseDumbLocation(this.history.location)
    let promise = this._matchRoute()

    this.history.listen((location, action) => {
      this.location = this._parseDumbLocation(location)
      if (!location.state.stateInduced) {
        this._matchRoute()
      }
    })
    return promise
  }

  _bindStore () {
    this.store.subscribe(() => {
      this._matchState()
    })
  }

  _matchRoute () {
    var { pathname, query } = this.location
    var match
    let route
    for (let i = 0; i < this.routes.length; ++i) {
      route = this.routes[i]
      if ((match = route.matchRoute(pathname, query))) break
    }

    let promises = []
    if (match) {
      console.info('LOCATION-INDUCED-STATE-CHANGE', route.pathname, route.actions)
      route.actions.forEach((action) => {
        if (typeof action === 'function') {
          action = action(..._values(match))
        }
        let result = this.store.dispatch(action)
        if (result instanceof Promise) {
          promises.push(result)
        }
      })
      return Promise.all(promises)
    } else {
      return false
    }
  }

  _matchState () {
    let match
    let route
    let state = this.store.getState()
    for (let i = 0; i < this.routes.length; ++i) {
      route = this.routes[i]
      if ((match = route.matchState(state))) break
    }

    if (match) {
      let newPath = route.pattern.stringify(match)
      if (this.location.pathname !== newPath) {
        console.info('STATE-INDUCED-PATH-CHANGE', newPath)
        this.history.push(newPath, { stateInduced: true })
      }
      return true
    } else {
      return false
    }
  }
}

// export const initialState = {}
//
// export const ROUTING_SET = 'ROUTING_SET'
//
// export function push (path) {
//
// }
//
// export function routingReducer (state, action) {
//   if (action.type === ROUTING_SET) {
//     let l = action.location
//     state = {
//       location: {
//         pathname: l.pathname,
//         query: l.query,
//         search: l.search,
//         hash: l.hash
//       }
//     }
//   }
//
//   return state
// }
