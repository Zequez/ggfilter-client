import { u } from 'lib/utils'
import { SET_QUERY_FILTER, REMOVE_QUERY_FILTER, SET_QUERY_SORT, SET_QUERY_BATCH_SIZE, SET_FULL_QUERY } from 'stores/actions'
import { query as initialState } from 'stores/initialState'

export default function queryReducer(state = initialState, action) {
  if (action.type === SET_QUERY_FILTER) {
    state = u(state, {filters: {[action.name]: {$set: action.data}}})
  } else if (action.type === REMOVE_QUERY_FILTER) {
    state = u(state, {filters: {[action.name]: {$set: {}}}})
    delete state.filters[action.name]
  } else if (action.type === SET_QUERY_SORT) {
    if (state.sort == action.name) {
      state = u(state, {sort_asc: {$set: !state.sort_asc}})
    } else {
      state = u(state, {sort: {$set: action.name}, sort_asc: { $set: true }})
    }

  } else if (action.type === SET_QUERY_BATCH_SIZE) {
    state = u(state, {batchSize: {$set: action.size}})
  } else if (action.type === SET_FULL_QUERY) {
    state = action.query
  }

  return state
}
