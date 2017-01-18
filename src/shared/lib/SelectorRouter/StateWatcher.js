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

  start () { this.watching++ }
  stop () { this.watching-- }
  unbind () { this.unsubscribe() }

  _bindStore () {
    this.unsubscribe = this.store.subscribe(() => {
      if (this.watching === 0) {
        this._matchState()
      }
    })
  }

  _matchState () {
    let state = this.store.getState()

    let path
    // let route =

    this.routes.find((r) => path = r.matchState(state))

    if (typeof path === 'string') {
      // console.info('SelectorRouter: MATCHED STATE', route.name)
      this.onMatch(path)
    } else {
      console.warn('Current state does not match any known route')
    }
  }
}
