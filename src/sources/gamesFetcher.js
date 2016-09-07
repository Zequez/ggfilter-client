const axios = require('axios')

var config = require('sources/config')
var qs = require('qs')
var filtersDefinitions = require('sources/filtersDefinitions')

function generateQueryFilter (filter, page, options) {
  // Some filters require more than one column to work,
  // not neccesarily visible, we need to get all those columns
  var columns = []
  for (let i = 0; i < filter.visible.length; ++i) {
    let columnInputs = filtersDefinitions[filter.visible[i]].columnInputs
    for (let k in columnInputs) {
      columns.push(columnInputs[k])
    }
  }

  let sortDir = filter.sort_asc ? 'asc' : 'desc'

  return {
    filters: JSON.stringify(filter.params),
    sort: `${filter.sort}_${sortDir}`,
    limit: options.batchSize,
    columns: columns,
    page: page
  }
}

export default function gamesFetcher (filter, page, options) {
  let queryFilter = generateQueryFilter(filter, page, options)
  let queryString = qs.stringify(queryFilter, {arrayFormat: 'brackets'})

  return axios.get(`${config.HOST}/games.json?${queryString}`)
    .then((response) => {
      return response.data
    }, (error) => {
      console.error(error)
    })
}
