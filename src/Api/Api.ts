import { api, withMeta, get, post, patch, del, snake, camel, cached } from './loader'
import { actionBar } from '../SysreqCalc/theme.sass';

export default {
  games: {
    index: (params) => api.get(`games.json`, {
      params: {
        ...params,
        filter: JSON.stringify(params.filter)
      }
    }).then(withMeta)
  },
  filters: {
    index: (params) => get(`/hyper_filters`, snake(params)).then(camel),
    show: (sid) => get(`/hyper_filters/${sid}`).then(camel),
    create: (filter) => post(`/hyper_filters`,
      {
        hyper_filter: snake({...filter, configuration: JSON.stringify(filter.configuration)}, false)
      }).then(camel),
    update: (filter, ownership_hash) => patch(`/hyper_filters/${filter.sid}`,
      {
        hyper_filter: snake({...filter, configuration: JSON.stringify(filter.configuration)}, false),
        ownership_hash
      }).then(camel),
    delete: (sid, secret) => del(`/filters/${sid}`, { secret })
  },
  tags: {
    index: () => cached(get, 'tags.json')
  },
  percentiles: {
    index: () => cached(get, 'percentiles.json')
  },
  auth: {
    currentUser: () => get(`auth/current_user.json`)
  },
  scrapLogs: {
    index: () => get(`scrap_logs.json`)
  }
}
