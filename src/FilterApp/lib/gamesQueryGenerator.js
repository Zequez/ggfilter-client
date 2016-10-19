import { selectors } from '../filter'

const { filterSelector, queryColumnsSelector, activeParamsSelector } = selectors

export default function gamesQueryGenerator (state, page, options) {
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
