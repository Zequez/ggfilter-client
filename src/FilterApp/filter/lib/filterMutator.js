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

/**
 * Removes the filter attributes that are exactly the
 * same as the base attributes.
 * Returns the same filter but with new params and sort if those
 * changed
 * @param {filter} filter
 * @param {filter} base
 * @returns {filter}
 */
export function deleteRedundantAttrs (filter, base) {
  filter.params = _deleteRedundantAttrs(filter.params, base.params)
  filter.sort = _deleteRedundantAttrs(filter.sort, base.sort)
  return filter
}

function _deleteRedundantAttrs (filter, base) {
  let initialFilter = filter

  for (let key in filter) {
    let v1 = filter[key]
    let v2 = base[key]
    if (v1 === v2 || (typeof v1 === 'object' && isEqual(v1, v2))) {
      if (filter === initialFilter) filter = {...filter}
      delete filter[key]
    }
  }

  return filter
}

export function isMaskFullyOverriden (mask, filter) {
  return (
    _isMaskFullyOverriden(mask.params, filter.params) &&
    _isMaskFullyOverriden(mask.sort, filter.sort)
  )
}

function _isMaskFullyOverriden (mask, filter) {
  if (!mask) return true

  for (let key in mask) {
    if (filter[key] === undefined) return false
  }
  return true
}

/**
 * Removes the filter attributes that are present in the mask
 * Returns a new filter
 * @param {filter} filter
 * @param {filter} mask
 * @returns {filter}
 */
export function removeAttrsInMask (filter, mask) {
  filter = { ...filter }
  filter.params = _removeAttrsInMask(filter.params, mask.params)
  filter.sort = _removeAttrsInMask(filter.sort, mask.sort)
  return filter
}

function _removeAttrsInMask (filter, mask) {
  if (!mask) return filter
  let initialFilter = filter
  for (let key in mask) {
    if (filter[key] !== undefined) {
      if (filter === initialFilter) filter = { ...filter }
      delete filter[key]
    }
  }
  return filter
}
