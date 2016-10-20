// ###############
// !!! WARNING !!!
// ###############
// This should be extracted from ../../filter
// But it causes a circular dependency
// So we don't
// I haven't found a way to fix it yet
// This is because the filter reducer needs to call getGames
// And the games reducer requires this file
// And this file would require ../../filter
// And the index would require both the selectors, but also the reducer
//
// For now we can just imagine that FilterApp/games
// it's actually a submodule of FilterApp/filter
const {
  filterSelector,
  queryColumnsSelector,
  activeParamsSelector
} = require('../../filter/selectors')

export default function filterQuery (state, page, options) {
  let filter = filterSelector(state)
  let columns = queryColumnsSelector(state)
  let params = activeParamsSelector(state)
  let sortDir = filter.sort.asc ? 'asc' : 'desc'

  return {
    filters: JSON.stringify(params),
    sort: `${filter.sort.column}_${sortDir}`,
    limit: 20,
    columns: columns,
    page: page
  }
}