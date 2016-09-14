import axios from 'axios'
import config from 'sources/config'

export function createFilter (filter) {
  return axios.post(`${config.apiHost}/filters.json`, { filter: {
    filter: JSON.stringify(filter)
  }}).then((response) => {
    return response.data
  })
}

export function getFilter (sid) {
  return axios.get(`${config.apiHost}/filters/${sid}`).then((response) => {
    return response.data
  })
}
