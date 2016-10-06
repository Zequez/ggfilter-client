import _values from 'lodash/values'
import { multiConstructor } from './Route'
import StateWatcher from './StateWatcher'
import LocationWatcher from './LocationWatcher'

import { routeChange } from './routeChangeAction'

export default class StateRouter {
  routes = []
  routesByName = {}
  store = null
  history = null
  location = {}

  constructor (routesList = []) {
    ;[this.routes, this.routesByName] = multiConstructor(routesList)
  }

  bind (store, history) {
    this.store = store
    this.history = history

    this.locationWatcher = new LocationWatcher(
      history,
      this.routes,
      ::this._dispatchLocationActions,
      ::this._receiveStateInducedLocationChange
    )
    this.stateWatcher = new StateWatcher(
      store,
      this.routes,
      ::this._dispatchStateLocationPush
    )
  }

  dispatchInitialActions () {
    let matches = this.locationWatcher.matchRoute()
    if (matches) {
      return this._dispatchLocationActions(...matches)
    } else {
      return Promise.resolve()
    }
  }

  url (name, ...params) {
    let route = this.routesByName[name]
    if (route) {
      return route.stringify(...params)
    }
  }

  autoUrl (name) {
    let route = this.routesByName[name]
    if (route) {
      let params = route.matchState(this.store.getState(), true)
      return route.stringify(params)
    }
  }

  route (name) {
    return this.routesByName[name]
  }

  _dispatchLocationActions (route, match, location) {
    this.route = route
    this.location = location
    console.info('LOCATION-INDUCED-STATE-CHANGE', route.path)

    let actions = route.actions.concat(routeChange(this.route, this.location, false))
    return this._dispatch(actions, match)
  }

  _receiveStateInducedLocationChange (location) {
    console.info('STATE-INDUCED-PATH-CHANGE', location.pathname)
    this.location = location
    this._dispatch(routeChange(this.route, location, true))
  }

  _dispatchStateLocationPush (route, match) {
    this.route = route
    let newPath = route.pattern.stringify(match)

    if (this.location.pathname !== newPath) {
      this.locationWatcher.stop()
      this.history.push(newPath)
      this.locationWatcher.start()
    }
  }

  _dispatch (actions, match = {}) {
    if (actions.constructor !== Array) actions = [actions]
    this.stateWatcher.stop()
    let promises = []
    actions.forEach((action) => {
      if (typeof action === 'function') {
        action = action(..._values(match))
      }
      let result = this.store.dispatch(action)
      if (result instanceof Promise) {
        promises.push(result)
      }
    })
    let combinedPromises = Promise.all(promises)
    combinedPromises.then(() => { this.stateWatcher.start() })
    return combinedPromises
  }
}
