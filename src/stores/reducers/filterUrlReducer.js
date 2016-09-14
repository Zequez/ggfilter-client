import { u } from 'lib/utils'
import { encode } from 'lib/b64FilterGenerator'
import { createFilter } from 'sources/api'

import { FILTER_LOADING_FROM_SID, FILTER_TOGGLE, FILTER_SET, FILTER_CLEAR, FILTER_SORT } from 'stores/reducers/filterReducer'

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

// User filters stuff and clicks the button -> base64
// User clicks the shorten-url button on the share tab -> hash
//   User nows modifies the filter again, back to -> base64
// User loads a filter with a hash -> hash
//   User modifies the thing -> base64
// User loads an official filter -> official url
//   User modifies anything -> base64

export const FILTER_URL_SID_START = 'FILTER_URL_SID_START'
export const FILTER_URL_SID_END = 'FILTER_URL_SID_END'
export const FILTER_URL_SID_ERROR = 'FILTER_URL_SID_ERROR'

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
      state = u(state, { type: {$set: URLS_TYPES.b64} })
      break
  }

  return state
}
