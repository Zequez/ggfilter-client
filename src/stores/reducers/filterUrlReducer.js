import { u } from 'lib/utils'
import { createFilter } from 'sources/api'

import { FILTER_LOADING_FROM_SID, FILTER_TOGGLE, FILTER_SET, FILTER_CLEAR, FILTER_SORT, FILTER_RESET } from 'stores/reducers/filterReducer'

export const WHAT = 'rsaersinaioerast'

export const URLS_TYPES = {
  b64: 'b64',
  sid: 'sid',
  official: 'official'
}

export const initialState = {
  type: URLS_TYPES.b64, // sid / base64 / official
  sid: null,
  slug: null,
  error: null
}

export const FILTER_URL_SID_START = 'FILTER_URL_SID_START'
export const FILTER_URL_SID_END = 'FILTER_URL_SID_END'
export const FILTER_URL_SID_ERROR = 'FILTER_URL_SID_ERROR'

export function filterUrlGenerateSid () {
  return function (dispatch, getState) {
    let { filter, filterUrl } = getState()
    if (filterUrl.type !== URLS_TYPES.sid) {
      dispatch({ type: FILTER_URL_SID_START })
      createFilter(filter).then(({sid}) => {
        dispatch({ type: FILTER_URL_SID_END, sid })
      }, (error) => {
        console.error(error)
      })
    }
  }
}

export function reducer (state = initialState, action) {
  switch (action.type) {
    case FILTER_URL_SID_START:
      break
    case FILTER_URL_SID_END:
    case FILTER_LOADING_FROM_SID:
      state = u(state, { type: {$set: URLS_TYPES.sid}, sid: {$set: action.sid} })
      break
    case FILTER_URL_SID_ERROR:
      state = u(state, { error: {$set: 'Some error IDK'} })
      break
    case FILTER_TOGGLE:
    case FILTER_SET:
    case FILTER_CLEAR:
    case FILTER_SORT:
    case FILTER_RESET:
      state = u(state, { type: {$set: URLS_TYPES.b64} })
      break
  }

  return state
}
