import pick from 'lodash/pick'
import api from 'shared/lib/apiRequester'

export function officialFilters () {
  return api.get('filters.json').then((response) => response.data)
}

export function userFilters (userId) {
  return api.get(`filters.json?user_id=${userId}`).then((response) => response.data)
}

export function createFilter (sfilter, filter) {
  return api.post('filters.json', { filter: {
    filter: JSON.stringify(filter),
    ...pick(sfilter, 'name', 'officialSlug', 'userSlug', 'name')
  }}).then((response) => response.data)
}

export function updateFilter (sfilter, filter) {
  return api.patch(`filters/${sfilter.sid}.json`, { filter: {
    filter: JSON.stringify(filter),
    ...pick(sfilter, 'name', 'officialSlug', 'userSlug', 'name')
  }}).then((response) => response.data)
}

export function destroyFilter (sid) {
  return api.delete(`filters/${sid}.json`).then((response) => response.data)
}

export function getFilter (sid) {
  return api.get(`filters/${sid}.json`).then((response) => response.data)
}

export function getFilterByOfficialSlug (officialSlug) {
  return api.get(`filters/0.json?official_slug=${officialSlug}`)
    .then((response) => response.data)
}

export function getUserFilter (userId, userSlug) {
  return api.get(`filters/0.json?user_id=${userId}&user_slug=${userSlug}`)
    .then((response) => response.data)
}

export function getTags () {
  return api.get('tags.json').then((response) => response.data)
}

export function getGames (queryFilter) {
  return api.get(`games.json`, {params: queryFilter})
    .then((response) => {
      let count = Number(response.headers['x-pagination-count'])
      return {totalCount: count, data: response.data}
    }, (error) => {
      console.error(error)
    })
}

export function getCurrentUser () {
  return api.get(`auth/current_user.json`).then((r) => r.data)
}

export function getScrapLogs () {
  return api.get(`scrap_logs.json`).then((response) => response.data)
}
