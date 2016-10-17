import { createSelector } from 'reselect'
import filtersDefinitions from '../config/filtersDefinitions'
import plusFilterParams from '../config/plusFilterParams'
import { NAME } from './constants'

export const filterSelector = (s) => s[NAME]
export const visibleFiltersSelector = (s) => s[NAME].visible
export const paramsSelector = (s) => s[NAME].params

export const plusFilterSelector = createSelector(
  filterSelector,
  (filter) => {
    return {...filter, params: {...filter.params, ...plusFilterParams}}
  }
)

export const visibleFiltersDefinitionsSelector = createSelector(
  visibleFiltersSelector,
  (visible) => {
    return visible.map((f) => filtersDefinitions[f])
  }
)
