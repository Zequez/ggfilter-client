import { createSelector } from 'reselect'
// import frontPageFilter from './frontPageFilter'
// import { encode } from '../lib/filterEncoder'
// import { combiner } from './lib/filterMutator'
import definitions from '../lib/definitions'
// import { isQueryActive, isFilterEmpty } from '../lib/utils'

export const ID = 'filter'
export const base = (s) => s[ID]
export const filter = createSelector(
  base,
  (ss) => ss.filter
)
export const controlsList = createSelector(filter, (f) => f.controlsList)
export const controlsParams = createSelector(filter, (f) => f.controlsParams)
export const controlsHlMode = createSelector(filter, (f) => f.controlsHlMode)
// export const columnsList = createSelector(filter, (f) => f.columnsList)
export const columnsList = createSelector(filter, (f) => f.controlsList) // Intentional
// export const columnsParams = createSelector(filter, (f) => f.columnsParams)
export const columnsParams = createSelector(filter, (f) => f.controlsParams) // Intentional
export const sorting = createSelector(filter, (f) => f.sorting)
export const globalConfig = createSelector(filter, (f) => f.globalConfig)

export const definedControlsList = createSelector(controlsList, (controls) =>
  definitions.sortNames(controls)
    .map((controlName) => definitions.filters[controlName])
)

export const definedColumnsList = definedControlsList // Intentional
// export const definedColumnsList = createSelector(columnsList, (columns) =>
//   columns.map((columnName) => definitions.filters[columnName])
// )

export const sortingColumn = createSelector(sorting, (sorting) =>
  definitions.filters[sorting.column])

//**************************
//* OLD SELECTORS

// export const stateSelector = (s) => s[ID]
// export const baseFilterSelector = (s) => s[ID].base
// export const deltaFilterSelector = (s) => s[ID].delta
//
// export const finalFilterSelector = createSelector(
//   baseFilterSelector,
//   deltaFilterSelector,
//   (baseFilter, deltaFilter) => combiner(baseFilter, deltaFilter)
// )
//
// export const isFrontPageFilter = createSelector(
//   baseFilterSelector,
//   (baseFilter) => baseFilter === frontPageFilter
// )
//
// export const isDirtySelector = createSelector(
//   deltaFilterSelector,
//   (deltaFilter) => !isFilterEmpty(deltaFilter)
// )
//
// export const sidSelector = createSelector(
//   baseFilterSelector,
//   (baseFilter) => ''
// )
//
// export const paramsSelector = createSelector(
//   finalFilterSelector,
//   (filter) => filter.params
// )
//
// export const activeParamsSelector = createSelector(
//   paramsSelector,
//   (params) => {
//     let newParams = {}
//     for (let k in params) {
//       if (isQueryActive(params[k])) {
//         newParams[k] = params[k]
//       }
//     }
//     return newParams
//   }
// )
//
// export const visibleFiltersSelector = createSelector(
//   paramsSelector,
//   (params) => Object.keys(params).filter((v) => params[v] !== false)
// )
//
// export const visibleFiltersDefinitionsSelector = createSelector(
//   visibleFiltersSelector,
//   (visible) => visible.map((f) => definitions.filters[f])
// )
//
// export const queryColumnsSelector = createSelector(
//   visibleFiltersDefinitionsSelector,
//   (visible) => visible.reduce((cols, f) => cols.concat(Object.values(f.columnInputs)), [])
// )
//
// export const encodedDeltaSelector = createSelector(
//   deltaFilterSelector,
//   (filter) => encode(filter)
// )
