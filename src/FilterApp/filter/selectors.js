import { createSelector } from 'reselect'
import { isEmpty } from 'shared/lib/utils'
import { encode } from '../lib/filterEncoder'
import definitions from '../lib/definitions'
import defaultFilter from '../config/defaultFilter'
import { NAME } from './constants'

export const filterSelector = (s) => ({
  params: {
    ...defaultFilter.params,
    ...s[NAME].params
  },
  sort: {
    ...defaultFilter.sort,
    ...s[NAME].sort
  }
})

export const deltaFilterSelector = (s) => s[NAME]
export const isDirtySelector = (s) => !isEmpty(s[NAME].params) || !isEmpty(s[NAME].sort)

export const paramsSelector = createSelector(
  filterSelector,
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
