import { parseQuery } from 'shared/lib/utils'

export default class LocationWatcher {
  history = null
  routes = []
  onMatch = () => {}
  onStateInducedLocationChange = () => {}
  unlisten = null

  location = null
  watching = 0

  constructor (history, routes, onMatch, onStateInducedLocationChange) {
    this.history = history
    this.routes = routes
    this.onMatch = onMatch
    this.onStateInducedLocationChange = onStateInducedLocationChange
    this._bindHistory()
  }

  start () { this.watching++ }
  stop () { this.watching-- }
  unbind () { this.unlisten() }

  matchRoute () {
    let actions
    let route = this.routes.find((r) => actions = r.matchPath(this.location))

    if (route) {
      console.info('SelectorRouter: MATCHED ROUTE', route.path)
      if (route.redirect) {
        this.history.push(route.redirect)
      }
      return actions
    } else {
      console.warn('Current location does not match any known route')
    }
  }

  _bindHistory () {
    this.location = this._parseDumbLocation(this.history.location)

    this.unlisten = this.history.listen((location, action) => {
      this.location = this._parseDumbLocation(location)
      if (this.watching === 0) {
        let actions = this.matchRoute()
        if (actions) { this.onMatch(actions) }
      } else {
        this.onStateInducedLocationChange(location)
      }
    })
  }

  _parseDumbLocation (dumbLocation) {
    if (!dumbLocation.pathname) {
      console.error("You're pushing something wrong. Pushed location:", dumbLocation)
    }

    return {
      pathname: dumbLocation.pathname || '/',
      search: dumbLocation.search || '',
      query: parseQuery(dumbLocation.search || ''),
      hash: dumbLocation.hash || ''
    }
  }
}
