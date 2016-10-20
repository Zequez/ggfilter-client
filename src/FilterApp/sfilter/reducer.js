import { u } from 'shared/lib/utils'

const api = require('shared/lib/api')

const {
  actions: {
    DIRTY_ACTIONS: FILTER_DIRTY_ACTIONS,
    RESET: FILTER_RESET,
    set: setFullFilter
  },
  selectors: {
    deltaFilterSelector
  }
} = require('../filter')

export const initialState = {
  dirty: false,
  filterDirty: false,
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

export const CHANGE = 'sfilter/CHANGE'

export const LOAD = 'sfilter/LOAD'
export const GET_REQUEST = 'sfilter/GET_REQUEST'
export const GET_SUCCESS = 'sfilter/GET_SUCCESS'
export const GET_FAILURE = 'sfilter/GET_FAILURE'
export const CREATE_REQUEST = 'sfilter/CREATE_REQUEST'
export const CREATE_SUCCESS = 'sfilter/CREATE_SUCCESS'
export const CREATE_FAILURE = 'sfilter/CREATE_FAILURE'
export const UPDATE_REQUEST = 'sfilter/UPDATE_REQUEST'
export const UPDATE_SUCCESS = 'sfilter/UPDATE_SUCCESS'
export const UPDATE_FAILURE = 'sfilter/UPDATE_FAILURE'
export const DESTROY_REQUEST = 'sfilter/DESTROY_REQUEST'
export const DESTROY_SUCCESS = 'sfilter/DESTROY_SUCCESS'
export const DESTROY_FAILURE = 'sfilter/DESTROY_FAILURE'

export const changeAttr = (attr, value) => ({ type: CHANGE, attr, value })
export const getFromSid = (sid) => ({
  types: [GET_REQUEST, GET_SUCCESS, GET_FAILURE],
  callAPI: () => api.getFilter(sid),
  after: (response, state, dispatch) => {
    return dispatch(setFullFilter(JSON.parse(response.filter)))
  },
  autoCamelize: true
})
export const getFromOfficialSlug = (officialSlug) => ({
  types: [GET_REQUEST, GET_SUCCESS, GET_FAILURE],
  callAPI: () => api.getFilterByOfficialSlug(officialSlug),
  after: (response, state, dispatch) => {
    dispatch(setFullFilter(JSON.parse(response.filter)))
  },
  autoCamelize: true
})
export const createFilter = (extraParams) => ({
  condition: (s) => s.sfilter.dirty || s.sfilter.filterDirty,
  types: [CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAILURE],
  callAPI: (state) => api.createFilter(state.sfilter.stageData, deltaFilterSelector(state)),
  autoCamelize: true
})
export const updateFilter = (extraParams) => ({
  condition: (s) => s.sfilter.data.sid && (s.sfilter.dirty || s.sfilter.filterDirty),
  types: [UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAILURE],
  callAPI: (state) => api.updateFilter(state.sfilter.stageData, deltaFilterSelector(state)),
  autoCamelize: true
})
export const destroyFilter = (sid) => ({
  types: [DESTROY_REQUEST, DESTROY_SUCCESS, DESTROY_FAILURE],
  callAPI: (state) => api.destroyFilter(sid || state.sfilter.data.sid)
})
export const loadFilter = (sfilter) => {
  return (dispatch, getState) => {
    dispatch(setFullFilter(JSON.parse(sfilter.filter)))
    dispatch({
      type: LOAD,
      response: sfilter
    })
  }
}

export function reducer (state = initialState, action) {
  switch (action.type) {
    case CHANGE:
      state = u(state, {
        dirty: {$set: true},
        stageData: {[action.attr]: {$set: action.value}}
      })
      break
    case LOAD:
    case CREATE_SUCCESS:
    case UPDATE_SUCCESS:
    case GET_SUCCESS:
      state = u(state, {
        dirty: {$set: false},
        filterDirty: {$set: false},
        error: {$set: null},
        data: {$set: action.response},
        stageData: {$set: action.response}
      })
      break

    case DESTROY_SUCCESS:
    case FILTER_RESET:
      state = initialState
      break
  }

  if (~FILTER_DIRTY_ACTIONS.indexOf(action.type)) {
    state = u(state, {filterDirty: {$set: true}})
  }

  return state
}
