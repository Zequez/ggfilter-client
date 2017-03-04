import { REPLACE } from 'redux-little-router'
import * as selectors from './filter/selectors'
import { getGames, showSfilter, resetFilter } from './filter/actions'

export const urls = {
  frontPage: () => '/',
  filter: (filter) => `/f/${filter.sid}` + (filter.nameSlug ? `/${filter.nameSlug}` : '')
}

export default {
  '/': {
    dispatch: () => showSfilter({sid: 0})
  },
  '/f': {
    dispatch: (_, getState) => {
      let filter = selectors.filter(getState())
      return {
        type: REPLACE,
        payload: filter.sid ? urls.filter(filter) : urls.frontPage()
      }
    }
  },
  '/f/:sid(/:nameSlug)': {
    dispatch: ({params}, getState) => {
      let filter = selectors.filter(getState())
      if (filter.sid !== params.sid) {
        return showSfilter({sid: params.sid})
      }
    }
  }
}
