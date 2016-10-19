import isEqual from 'lodash/isEqual'

export function combiner (...filters) {
  let initial = filters.shift()
  initial = { params: initial.params, sort: initial.sort }

  return filters.reduce((curr, mask) => {
    curr.params = { ...curr.params, ...mask.params }
    curr.sort = { ...curr.sort, ...mask.sort }
    return curr
  }, initial)
}

export function createLegacyFilter (newFilter) {
  let params = {}
  for (let key in newFilter.params) {
    let param = newFilter.params[key]
    if (typeof param === 'object') params[key] = param
  }

  return {
    visible: Object.keys(newFilter.params),
    params: params,
    sort: newFilter.sort.column,
    sortAsc: newFilter.sort.asc
  }
}

function negateObjects (target, source) {
  for (let key in target) {
    let v1 = target[key]
    let v2 = source[key]
    if (typeof v1 === 'object') {
      if (isEqual(v1, v2)) {
        delete target[key]
      }
    } else if (v1 === v2) {
      delete target[key]
    }
  }
}

export function deleteDefaultsFromMask (mask, defaultFilter) {
  negateObjects(mask.params, defaultFilter.params, true)
  negateObjects(mask.sort, defaultFilter.sort, false)

  return mask
}
