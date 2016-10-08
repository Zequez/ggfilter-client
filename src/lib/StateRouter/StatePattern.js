import _get from 'lodash/get'
import objectBreadcrumbs from './objectBreadcrumbs'

export default class StatePattern {
  shard = {}
  patternNames = []
  storeBreadcrumbs = []
  storeBreadcrumbsValues = []

  constructor (shard, patternNames) {
    this.shard = shard
    this.patternNames = patternNames

    this._analyzeShard()
  }

  _analyzeShard () {
    this.storeBreadcrumbs = objectBreadcrumbs(this.shard)
    for (let i = 0; i < this.storeBreadcrumbs.length; ++i) {
      // let val = this.storeBreadcrumbs[i].splice(-1, 1)[0]
      // if (val.match(/^:/)) val = null
      this.storeBreadcrumbsValues.push(this.storeBreadcrumbs[i].splice(-1, 1)[0])
    }
  }

  match (store, force = false) {
    let params = {}

    for (let i = 0; i < this.storeBreadcrumbs.length; ++i) {
      let bc = this.storeBreadcrumbs[i]
      let expectedVal = this.storeBreadcrumbsValues[i]

      let storeVal = _get(store, bc)

      if (expectedVal[0] === ':') {
        if (storeVal) {
          params[expectedVal.slice(1)] = storeVal
        } else {
          return null
        }
      } else if (storeVal !== expectedVal && !force) {
        return null
      }
    }

    return params
  }
}
