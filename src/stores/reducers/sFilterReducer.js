import { u } from 'lib/utils'

const api = require('sources/api')

import {
  FILTER_TOGGLE,
  FILTER_SET,
  FILTER_CLEAR,
  FILTER_SORT,
  FILTER_RESET,
  FILTER_SET_FULL
} from 'stores/reducers/filterReducer'

export const initialState = {
  dirty: false,
  error: null,
  data: {
    sid: null,
    name: null,
    officialSlug: null,
    userSlug: null,
    userId: null
  },
  stageData: {
    sid: null,
    name: null,
    officialSlug: null,
    userSlug: null,
    userId: null
  }
}

export const selectCurrentFilter = (s) => s.sfilter.data

export const SFILTER_CHANGE = 'SFILTER_CHANGE'

export const SFILTER_LOAD = 'SFILTER_LOAD'
export const SFILTER_GET_REQUEST = 'SFILTER_GET_REQUEST'
export const SFILTER_GET_SUCCESS = 'SFILTER_GET_SUCCESS'
export const SFILTER_GET_FAILURE = 'SFILTER_GET_FAILURE'
export const SFILTER_CREATE_REQUEST = 'SFILTER_CREATE_REQUEST'
export const SFILTER_CREATE_SUCCESS = 'SFILTER_CREATE_SUCCESS'
export const SFILTER_CREATE_FAILURE = 'SFILTER_CREATE_FAILURE'
export const SFILTER_UPDATE_REQUEST = 'SFILTER_UPDATE_REQUEST'
export const SFILTER_UPDATE_SUCCESS = 'SFILTER_UPDATE_SUCCESS'
export const SFILTER_UPDATE_FAILURE = 'SFILTER_UPDATE_FAILURE'
export const SFILTER_DESTROY_REQUEST = 'SFILTER_DESTROY_REQUEST'
export const SFILTER_DESTROY_SUCCESS = 'SFILTER_DESTROY_SUCCESS'
export const SFILTER_DESTROY_FAILURE = 'SFILTER_DESTROY_FAILURE'

export const changeAttr = (attr, value) => ({ type: SFILTER_CHANGE, attr, value })
export const getFromSid = (sid) => ({
  types: [SFILTER_GET_REQUEST, SFILTER_GET_SUCCESS, SFILTER_GET_FAILURE],
  callAPI: () => api.getFilter(sid),
  autoCamelize: true
})
export const getFromOfficialSlug = (officialSlug) => ({
  types: [SFILTER_GET_REQUEST, SFILTER_GET_SUCCESS, SFILTER_GET_FAILURE],
  callAPI: () => api.getFilterByOfficialSlug(officialSlug),
  autoCamelize: true
})
export const createFilter = (extraParams) => ({
  condition: (s) => s.sfilter.dirty,
  types: [SFILTER_CREATE_REQUEST, SFILTER_CREATE_SUCCESS, SFILTER_CREATE_FAILURE],
  callAPI: (state) => api.createFilter(state.sfilter.stageData, state.filter),
  autoCamelize: true
})
export const updateFilter = (extraParams) => ({
  condition: (s) => s.sfilter.data.sid && s.sfilter.dirty,
  types: [SFILTER_UPDATE_REQUEST, SFILTER_UPDATE_SUCCESS, SFILTER_UPDATE_FAILURE],
  callAPI: (state) => api.updateFilter(state.sfilter.stageData, state.filter),
  autoCamelize: true
})
export const destroyFilter = (sid) => ({
  types: [SFILTER_DESTROY_REQUEST, SFILTER_DESTROY_SUCCESS, SFILTER_DESTROY_FAILURE],
  callAPI: (state) => api.destroyFilter(sid || state.sfilter.data.sid)
})
export const loadFilter = (sfilter) => ({
  type: SFILTER_LOAD,
  response: sfilter
})

export function reducer (state = initialState, action) {
  switch (action.type) {
    case SFILTER_CHANGE:
      state = u(state, {
        dirty: {$set: true},
        stageData: {[action.attr]: {$set: action.value}}
      })
      break
    case SFILTER_LOAD:
    case SFILTER_CREATE_SUCCESS:
    case SFILTER_UPDATE_SUCCESS:
    case SFILTER_GET_SUCCESS:
      state = u(state, {
        dirty: {$set: false},
        error: {$set: null},
        data: {$set: action.response},
        stageData: {$set: action.response}
      })
      break
    case FILTER_TOGGLE:
    case FILTER_SET:
    case FILTER_CLEAR:
    case FILTER_SORT:
    case FILTER_SET_FULL:
      state = u(state, {dirty: {$set: true}})
      break
    case SFILTER_DESTROY_SUCCESS:
    case FILTER_RESET:
      state = initialState
      break
  }
  return state
}
