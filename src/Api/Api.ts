import { api, withMeta, get, post, patch, del, snake, camel, cached } from './loader'
import { actionBar } from '../SysreqCalc/theme.sass';

export default {
  games: {
    index: (params) => api.get(`games.json`, {params}).then(withMeta)
  },
  filters: {
    index: (params) => get(`/filters.json`, snake(params)).then(camel),
    show: ({sid}) => get(`/filters/${sid}.json`).then(camel),
    create: ({filter}) => post(`/filters`,
      {
        payload: snake(filter, false)
      }).then(camel),
    update: ({filter, secret}) => patch(`/filters/${filter.sid}.json`,
      {
        payload: snake(filter, false),
        secret
      }).then(camel),
    delete: ({sid, secret}) => del(`/filters/${sid}.json`, { secret })
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
