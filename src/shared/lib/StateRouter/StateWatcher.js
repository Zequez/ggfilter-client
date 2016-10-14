export default class StateWatcher {
  store = null
  routes = []
  onMatch = () => {}
  watching = 0
  unsubscribe = null

  constructor (store, routes, onMatch) {
    this.store = store
    this.routes = routes
    this.onMatch = onMatch
    this._bindStore()
  }

  start () {
    this.watching++
  }

  stop () {
    this.watching--
  }

  unbind () {
    this.unsubscribe()
  }

  _bindStore () {
    this.unsubscribe = this.store.subscribe(() => {
      if (this.watching === 0) {
        this._matchState()
      }
    })
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
      // console.info('STATE-BASED-ROUTE-MATCH')
      this.onMatch(route, match)
    } else {
      console.warn('Current state does not match any known route')
    }
  }
}
