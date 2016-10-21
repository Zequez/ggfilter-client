import { createSelector } from 'reselect'
import { encode } from '../lib/filterEncoder'
import { combiner } from './lib/filterMutator'
import definitions from '../lib/definitions'
import defaultFilter from '../config/defaultFilter'
import masks from '../config/masks'
import { NAME } from './constants'
import initialState from './initialState'

export const deltaFilterSelector =
  (s, fragment = false) => {
    return fragment ? s : s[NAME]
  }

export const filterMasksNames = createSelector(
  deltaFilterSelector,
  (s) => s.masks
)

export const filterMasks = createSelector(
  filterMasksNames,
  (names) => names.map((name) => masks[name])
)
export const maskedFilterSelector = createSelector(
  filterMasks,
  (masksList) => combiner(defaultFilter, ...masksList)
)

export const finalFilterSelector = createSelector(
  maskedFilterSelector,
  deltaFilterSelector,
  (maskedFilter, filter) => combiner(maskedFilter, filter)
)

export const isDirtySelector = (s) => s[NAME] !== initialState

export const paramsSelector = createSelector(
  finalFilterSelector,
  (filter) => filter.params
)

export const activeParamsSelector = createSelector(
  paramsSelector,
  (params) => {
    let newParams = {}
    for (let k in params) {
      if (params[k] !== false && params[k] !== true) {
        newParams[k] = params[k]
      }
    }
    return newParams
  }
)

export const visibleFiltersSelector = createSelector(
  paramsSelector,
  (params) => Object.keys(params).filter((v) => params[v] !== false)
)

export const visibleFiltersDefinitionsSelector = createSelector(
  visibleFiltersSelector,
  (visible) => {
    return visible.map((f) => definitions.filters[f])
  }
)

export const queryColumnsSelector = createSelector(
  visibleFiltersDefinitionsSelector,
  (visible) => visible.reduce((cols, f) => cols.concat(Object.values(f.columnInputs)), [])
)

export const encodedFilterSelector = createSelector(
  deltaFilterSelector,
  (filter) => encode(filter)
)
