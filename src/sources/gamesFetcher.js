var config = require('sources/config')
var qs = require('qs')
var filtersDefinitions = require('sources/filtersDefinitions')

export default function gamesFetcher (filters, query, page) {
  // Get the columns to request
  var columns = []
  for (let i = 0; i < filters.length; ++i) {
    let columnInputs = filtersDefinitions[filters[i]].columnInputs
    for (let k in columnInputs) {
      columns.push(columnInputs[k])
    }
  }
  var sort_dir = query.sort_asc ? 'asc' : 'desc'
  var queryString = qs.stringify({
    filters: JSON.stringify(query.filters),
    sort: `${query.sort}_${sort_dir}`,
    limit: query.batchSize,
    columns: columns,
    page: page
  }, {arrayFormat: 'brackets'})

  return fetch(`${config.HOST}/games.json?${queryString}`)
    .then(response => {
      if (response.status >= 200 && response.status <= 300) {
        return response.json()
      }
      else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    })
}
