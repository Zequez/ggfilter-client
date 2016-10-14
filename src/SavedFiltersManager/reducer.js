import { u } from 'shared/lib/utils'
import findIndex from 'lodash/findIndex'
const api = require('shared/lib/api')

export const initialState = {
  data: []
}

export const REQUEST = 'SavedFiltersManager/REQUEST'
export const SUCCESS = 'SavedFiltersManager/SUCCESS'
export const FAILURE = 'SavedFiltersManager/FAILURE'
export const DELETE_REQUEST = 'SavedFiltersManager/DELETE_REQUEST'
export const DELETE_SUCCESS = 'SavedFiltersManager/DELETE_SUCCESS'
export const DELETE_FAILURE = 'SavedFiltersManager/DELETE_FAILURE'

export const fetch = (userId) => ({
  types: [REQUEST, SUCCESS, FAILURE],
  callAPI: () => api.userFilters(userId),
  autoCamelize: true
})

export const destroy = (sfilter) => ({
  types: [DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE],
  callAPI: () => api.destroyFilter(sfilter.sid)
})

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SUCCESS:
      state = u(state, {data: {$set: action.response}})
      break
    case DELETE_SUCCESS:
      let i = findIndex(state.data, ['sid', action.response.sid])
      state = u(state, {data: {$splice: [[i, 1]]}})
      break
  }

  return state
}
