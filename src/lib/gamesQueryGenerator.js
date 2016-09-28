import filtersDefinitions from 'sources/filtersDefinitions'

export default function gamesQueryGenerator (filter, page, options) {
  // Some filters require more than one column to work,
  // not neccesarily visible, we need to get all those columns
  var columns = []
  for (let i = 0; i < filter.visible.length; ++i) {
    let columnInputs = filtersDefinitions[filter.visible[i]].columnInputs
    for (let k in columnInputs) {
      columns.push(columnInputs[k])
    }
  }

  let sortDir = filter.sortAsc ? 'asc' : 'desc'

  return {
    filters: JSON.stringify(filter.params),
    sort: `${filter.sort}_${sortDir}`,
    limit: options.batchSize,
    columns: columns,
    page: page
  }
}
