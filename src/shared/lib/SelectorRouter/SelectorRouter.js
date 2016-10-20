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
      let route = new Route(name, ...routes[name])
      this.routes.push(route)
      this.routesByName[name] = route
    }
  }

  url (name, ...params) {
    let route = this.routesByName[name]
    if (!route) throw new Error('No such route: ' + name)
    return route.stringify(...params)
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
    console.info('SelectorRouter: MATCHED STATE, Location: ', location.pathname)
  }

  _dispatch (actions) {
    this.stateWatcher.stop()

    let promises = []
    actions.forEach((action) => {
      let result = this.store.dispatch(action)
      if (result instanceof Promise) promises.push(result)
    })
    promises = Promise.all(promises)

    promises.then(() => { this.stateWatcher.start() })
    return promises
  }

  _push (pathname) {
    if (this.locationWatcher.location.pathname !== pathname) {
      this.locationWatcher.stop()
      this.history.push(pathname)
      this.locationWatcher.start()
    }
  }
}
