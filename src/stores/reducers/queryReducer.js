import { SET_QUERY_FILTER, REMOVE_QUERY_FILTER, SET_QUERY_SORT, SET_QUERY_BATCH_SIZE } from 'stores/actions'
var initialState = require('stores/initialState').query
var update = require('react-addons-update')

function queryReducer(state = initialState, action) {
  if (action.type == SET_QUERY_FILTER) {
    state = update(state, {filters: {[action.name]: {$set: action.data}}})
  }
  else if (action.type == REMOVE_QUERY_FILTER) {
    state = update(state, {filters: {[action.name]: {$set: {}}}})
    delete state.filters[action.name]
  }
  else if (action.type == SET_QUERY_SORT) {
    if (state.sort == action.name) {
      state = update(state, {sort_asc: {$set: !state.sort_asc}})
    }
    else {
      state = update(state, {sort: {$set: action.name}, sort_asc: { $set: true }})
    }

  }
  else if (action.type == SET_QUERY_BATCH_SIZE) {
    state = update(state, {batchSize: {$set: action.size}})
  }

  return state
}

export default queryReducer
