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

  start () {
    this.watching++
  }

  stop () {
    this.watching--
  }

  matchRoute () {
    var { pathname, query } = this.location
    var match
    let route

    for (let i = 0; i < this.routes.length; ++i) {
      route = this.routes[i]
      if ((match = route.matchRoute(pathname, query))) break
    }

    if (match) {
      return [route, match, this.location]
    } else {
      console.warn('Current location does not match any known route')
    }
  }

  unbind () {
    this.unlisten()
  }

  _bindHistory () {
    this.location = this._parseDumbLocation(this.history.location)

    this.unlisten = this.history.listen((location, action) => {
      this.location = this._parseDumbLocation(location)
      if (this.watching === 0) {
        let matches = this.matchRoute()
        if (matches) {
          this.onMatch(...matches)
        }
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
