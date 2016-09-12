import { u } from 'lib/utils'
import { encode } from 'lib/urlificator'

import { TOGGLE_FILTER, SET_QUERY_FILTER, REMOVE_QUERY_FILTER, SET_QUERY_SORT } from 'stores/actions'

import axios from 'axios'
import config from 'sources/config'

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

// User filters stuff and clicks the button -> base64
// User clicks the shorten-url button on the share tab -> hash
//   User nows modifies the filter again, back to -> base64
// User loads a filter with a hash -> hash
//   User modifies the thing -> base64
// User loads an official filter -> official url
//   User modifies anything -> base64

export const FILTER_URL_SID_START = Symbol('FILTER_URL_SID_START')
export const FILTER_URL_SID_END = Symbol('FILTER_URL_SID_END')
export const FILTER_URL_SID_ERROR = Symbol('FILTER_URL_SID_ERROR')

// export function navigateToFilterUrl () {
//   return function (dispatch, getState) {
//     let state = getState()
//     let filterUrl = state.filterUrl
//     if (filterUrl.type === URLS_TYPES.b64) {
//       dispatch(push('/b/' + encode(state.filter)))
//       // go to base64 url
//     } else if (filterUrl.type === URLS_TYPES.sid) {
//       dispatch(push('/f/' + filterUrl.sid))
//       // go to sid url
//     } else if (filterUrl.type === URLS_TYPES.official) {
//       dispatch(push('/' + filterUrl.slug))
//       // go to official url
//     }
//   }
// }

export function filterUrlGenerateSid () {
  return function (dispatch, getState) {
    let state = getState()
    // TODO: fix filters and stuff thingy
    let filter = { columns: [], filters: {} }
    dispatch({ type: FILTER_URL_SID_START })
    axios.post(`${config.host}/frozen_filters`, { filter })
      .then((frozenFilter => {
        dispatch({ type: FILTER_URL_SID_END, sid: frozenFilter.sid })
      }, (error) => {
        console.error(error)
      }))
  }
}

export default function filterUrl (state = initialState, action) {
  switch (action.type) {
    case FILTER_URL_SID_START:
      break
    case FILTER_URL_SID_END:
      state = u(state, { sid: {$set: action.hash} })
      break
    case FILTER_URL_SID_ERROR:
      state = u(state, { error: {$set: 'Some error IDK'} })
      break
    case TOGGLE_FILTER:
    case SET_QUERY_FILTER:
    case REMOVE_QUERY_FILTER:
    case SET_QUERY_SORT:
      state = u(state, { type: {$set: URLS_TYPES.b64} })
      break
  }

  return state
}
