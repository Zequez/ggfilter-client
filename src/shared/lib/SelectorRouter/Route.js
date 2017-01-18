import LocationPattern from './LocationPattern'

export default class Route {
  name = null

  selectors = null
  actions = null
  conditions = null

  constructor (name, config) {
    this.config = {
      name,
      path: '*',
      query: {},
      selectors: (s) => ({}),
      actions: (params, location) => () => Promise.resolve(),
      conditions: (s) => true,
      redirect: false,
      ...config
    }

    this.redirect = this.config.redirect
    this.path = this.config.path
    this.name = this.config.name
    this.locationPattern = new LocationPattern(this.config.path, this.config.query)

    // Convert the shortcuts here
    this.selectors = this.config.selectors
    this.actions = this.config.actions
    this.conditions = this.config.conditions
  }

  matchPath (location) {
    let params = this.locationPattern.match(location)
    if (params) {
      return this.actions(params, location)
    } else {
      return null
    }
  }

  matchState (state, force = false) {
    if (force || this.conditions(state)) {
      let params = this.selectors(state)
      return this.locationPattern.stringify(params)
    } else {
      return null
    }
  }

  stringify (params) {
    return this.locationPattern.stringify(params)
  }

  stringifyFlat (...paramsArray) {
    let params = {}
    paramsArray.forEach((val, i) => {
      params[this.locationPattern.names[i]] = val
    })
    return this.stringify(params)
  }
}
