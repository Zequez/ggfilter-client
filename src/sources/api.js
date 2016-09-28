import axios from 'axios'
import qs from 'qs'
import config from 'sources/config'
import gamesQueryGenerator from 'lib/gamesQueryGenerator'

let apiUrl = (path) => `${config.apiHost}/${path}`

export function createFilter (filter) {
  return axios.post(apiUrl('/filters.json'), { filter: {
    filter: JSON.stringify(filter)
  }}).then((response) => {
    return response.data
  })
}

export function getFilter (sid) {
  return axios.get(apiUrl(`/filters/${sid}`)).then((response) => {
    return response.data
  })
}

export function getTags () {
  return axios.get(apiUrl('tags.json')).then((response) => response.data)
}

export function getGames (filter, page, options) {
  let queryFilter = gamesQueryGenerator(filter, page, options)
  let queryString = qs.stringify(queryFilter, {arrayFormat: 'brackets'})

  return axios.get(apiUrl(`games.json?${queryString}`))
    .then((response) => {
      return response.data
    }, (error) => {
      console.error(error)
    })
}
