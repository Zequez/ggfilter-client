import { SET_QUERY_FILTER, REMOVE_QUERY_FILTER, SET_QUERY_SORT, SET_QUERY_BATCH_SIZE } from './actions'

const initialState = {
  filters: {
    name: { value: 'civ', filter: true, highlight: false }
  },
  sort: [],
  batchSize: 20
}

function queryReducer(state = initialState, action) {
  if (action.type == SET_QUERY_FILTER) {
    state = _.clone(state)
    action.data.filter = action.filter
    action.data.highlight = action.highlight
    state.filters[action.name] = action.data
  }
  else if (action.type == REMOVE_QUERY_FILTER) {
    state = _.clone(state)
    delete state.filters[action.name]
  }
  else if (action.type == SET_QUERY_SORT) {
    state = _.clone(state)
    state.sort.unshift(action.name)
    if (state.sort.length > 3) {
      state.sort.pop()
    }
  }
  else if (action.type == SET_QUERY_BATCH_SIZE) {
    state = _.clone(state)
    state.batchSize = action.size
  }

  return state
}

export default queryReducer
