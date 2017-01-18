import Route from './Route'
import LocationWatcher from './LocationWatcher'
import StateWatcher from './StateWatcher'

export default class SelectorRouter {
  routes = []
  routesByName = {}

  locationWatcher = null
  stateWatcher = null

  constructor (routes) {
    for (let name in routes) {
      let route = new Route(name, routes[name])
      this.routes.push(route)
      this.routesByName[name] = route
    }
  }

  url (name, ...params) {
    let route = this.routesByName[name]
    if (!route) throw new Error('No such route: ' + name)
    return typeof params[0] === 'object'
      ? route.stringify(params[0])
      : route.stringifyFlat(...params)
  }

  bind (store, history) {
    this.store = store
    this.history = history

    this.locationWatcher = new LocationWatcher(
      history,
      this.routes,
      ::this._dispatch,
      ::this._receiveStateInducedLocationChange
    )

    this.stateWatcher = new StateWatcher(
      store,
      this.routes,
      ::this._push
    )
  }

  unbind () {
    this.locationWatcher.unbind()
    this.stateWatcher.unbind()
  }

  dispatchInitialActions () {
    let actions = this.locationWatcher.matchRoute()
    return actions ? this._dispatch(actions) : Promise.resolve()
  }

  _receiveStateInducedLocationChange (location) {
    console.info('SelectorRouter: MATCHED STATE, Location: ', location.pathname + location.search)
  }

  _dispatch (actions) {
    this.stateWatcher.stop()

    let promise = this.store.dispatch(actions)

    if (promise === false) {
      this.history.push('/')
      this.stateWatcher.start()
    }

    if (typeof promise !== 'object' || typeof promise.then !== 'function') {
      promise = Promise.resolve()
    }

    promise.then(() => { this.stateWatcher.start() })
    return promise
  }

  _push (fullPath) {
    let location = this.locationWatcher.location
    let currentFullPath = location.pathname + location.search
    if (fullPath === '') fullPath = '/'
    if (fullPath !== currentFullPath) {
      this.locationWatcher.stop()
      this.history.push(fullPath)
      this.locationWatcher.start()
    }
  }
}
