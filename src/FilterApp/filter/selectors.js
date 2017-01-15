import { createSelector } from 'reselect'
import { encode } from '../lib/filterEncoder'
import { combiner } from './lib/filterMutator'
import definitions from '../lib/definitions'
import { isQueryActive, isFilterEmpty } from '../lib/utils'
import { NAME } from './constants'

export const stateSelector = (s) => s[NAME]
export const baseFilterSelector = (s) => s[NAME].base
export const deltaFilterSelector = (s) => s[NAME].delta

export const finalFilterSelector = createSelector(
  baseFilterSelector,
  deltaFilterSelector,
  (baseFilter, deltaFilter) => combiner(baseFilter, deltaFilter)
)

export const isDirtySelector = createSelector(
  deltaFilterSelector,
  (deltaFilter) => !isFilterEmpty(deltaFilter)
)

export const paramsSelector = createSelector(
  finalFilterSelector,
  (filter) => filter.params
)

export const activeParamsSelector = createSelector(
  paramsSelector,
  (params) => {
    let newParams = {}
    for (let k in params) {
      if (isQueryActive(params[k])) {
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
  (visible) => visible.map((f) => definitions.filters[f])
)

export const queryColumnsSelector = createSelector(
  visibleFiltersDefinitionsSelector,
  (visible) => visible.reduce((cols, f) => cols.concat(Object.values(f.columnInputs)), [])
)

export const encodedDeltaSelector = createSelector(
  deltaFilterSelector,
  (filter) => encode(filter)
)
