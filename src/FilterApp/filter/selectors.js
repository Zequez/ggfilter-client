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

/********************/
/* Filter Stuff
/********************/

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

/********************/
/* Sfilter stuff
/********************/

export const sfilter = createSelector(base, (ss) => ss.sfilter)
export const sfilterIsDirty = createSelector(sfilter, filter, (sf, f) => sf !== f)
export const secrets = createSelector(base, () =>
  window.localStorage.getItem('secrets') && JSON.parse(
    window.localStorage.getItem('secrets')
  ) || {}
)

/********************/
/* Games
/********************/

export const games = createSelector(base, (b) => b.games)
export const gamesBatches = createSelector(games, (games) => games.batches)
export const gamesTotalCount = createSelector(games, (games) => games.totalCount)
export const gamesCurrentPage = createSelector(gamesBatches, (batches) => batches.length)
export const gamesLoadedCount = createSelector(gamesBatches, (batches) =>
  batches.reduce((t, v) => t + v.length, 0))
export const gamesLoading = createSelector(games, (games) => games.loading)
export const gamesError = createSelector(games, (games) => games.error)
export const gamesAllLoaded = createSelector(
  gamesTotalCount,
  gamesLoadedCount,
  (total, loaded) => total === loaded
)
export const gamesFailed = createSelector(gamesError, (error) => !!error)

/********************/
/* Other stuff
/********************/

export const filterForApi = createSelector(
  definedControlsList,
  controlsParams,
  sorting,
  sortingColumn,
  controlsHlMode,
  (controls, controlsParams, sorting, sortingColumn, controlsHlMode) => {
    let params = {}
    controls.forEach((control) => {
      let param = controlsParams[control.name]
      if (param && ~controlsHlMode.indexOf(control.name)) {
        param = { ...param, hl: true }
      }
      params[control.name] = param || true
    })

    return {
      params: params,
      sort: {
        filter: sortingColumn.sort,
        asc: !sorting.direction
      }
    }
  }
)
