import gamesQueryGenerator from 'lib/gamesQueryGenerator'
import api from 'lib/apiRequester'

export function createFilter (filter) {
  return api.post('filters.json', { filter: {
    filter: JSON.stringify(filter)
  }}).then((response) => {
    return response.data
  })
}

export function getFilter (sid) {
  return api.get(`filters/${sid}`).then((response) => {
    return response.data
  })
}

export function getTags () {
  return api.get('tags.json').then((response) => response.data)
}

export function getGames (filter, page, options) {
  let queryFilter = gamesQueryGenerator(filter, page, options)

  let jsonQueryFilter = JSON.stringify(queryFilter)

  return api.get(`games.json`, {params: {filter: jsonQueryFilter}})
    .then((response) => {
      return response.data
    }, (error) => {
      console.error(error)
    })
}
