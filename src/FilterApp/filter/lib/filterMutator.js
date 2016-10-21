import isEqual from 'lodash/isEqual'

export function combiner (...filters) {
  let initial = filters.shift()
  initial = { ...initial }

  return filters.reduce((curr, mask) => {
    curr.params = { ...curr.params, ...mask.params }
    curr.sort = { ...curr.sort, ...mask.sort }
    if (mask.masks) curr.masks = mask.masks
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

// It creates new object only if it changes
function negateObjects (initialTarget, source) {
  let target = initialTarget

  for (let key in target) {
    let v1 = target[key]
    let v2 = source[key]
    if (typeof v1 === 'object') {
      if (isEqual(v1, v2)) {
        if (target !== initialTarget) target = {...target}
        delete target[key]
      }
    } else if (v1 === v2) {
      if (target !== initialTarget) target = {...target}
      delete target[key]
    }
  }

  return target
}

// This creates a new state.params and/or state.sort
// but it doesn't create a new state object
export function deleteRedundantAttrs (mask, defaultFilter) {
  mask.params = negateObjects(mask.params, defaultFilter.params, true)
  mask.sort = negateObjects(mask.sort, defaultFilter.sort, false)
  return mask
}

export function isMaskActive (filter, mask, deep = true) {
  for (let key in mask) {
    if (deep && typeof filter[key] === 'object') {
      if (!isMaskActive(filter[key], mask[key])) return false
    } else {
      if (filter[key] !== mask[key]) return false
    }
  }
  return true
}

function isObjectFullyOverriden (obj1, obj2) {
  if (!obj1) return true

  for (let key in obj1) {
    if (obj2[key] === undefined) return false
  }
  return true
}

export function isMaskFullyOverriden (mask, filter) {
  return (
    isObjectFullyOverriden(mask.params, filter.params) &&
    isObjectFullyOverriden(mask.sort, filter.sort)
  )
}
