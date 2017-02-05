import { api, withMeta, get, post, patch, del, snake } from './apiRequester'

export default {
  games: {
    index: (params) => api.get(`games.json`, {params}).then(withMeta)
  },
  filters: {
    index: () => get(`/filters.json`),
    show: (sid) => get(`/filters/${sid}.json`),
    create: (params) => post(`/filters`, snake(params, false)),
    update: (params) => patch(`/filters/${params.sid}.json`, snake(params, false)),
    delete: (sid) => del(`/filters/${sid}.json`)
  },
  tags: {
    index: () => get(`tags.json`)
  },
  auth: {
    currentUser: () => get(`auth/current_user.json`)
  },
  scrapLogs: {
    index: () => get(`scrap_logs.json`)
  }
}
