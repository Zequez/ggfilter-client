import { SET_QUERY_FILTER, REMOVE_QUERY_FILTER, SET_QUERY_SORT, SET_QUERY_BATCH_SIZE } from './actions'

const initialState = {
  filters: {
    name: { value: 'civ', filter: true, highlight: false }
  },
  sort: [],
  batchSize: 20
}

function queryReducer(state = initialState, action) {
  console.log(action)

  if (action.type == SET_QUERY_FILTER) {

  }
  else if (action.type == REMOVE_QUERY_FILTER) {

  }
  else if (action.type == SET_QUERY_SORT) {

  }
  else if (action.type == SET_QUERY_BATCH_SIZE) {

  }

  return state
}

export default queryReducer
