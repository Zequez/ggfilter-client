import { u } from 'lib/utils'
import { COLUMNS_WIDTH_ADJUST, COLUMNS_WIDTH_CLEAR } from 'stores/actions'
import { columnsWidth as initialState } from 'stores/initialState'

export default function columnsWidthReducer(state = initialState, action) {
  if (action.type === COLUMNS_WIDTH_ADJUST) {
    var current = state[action.name] || 0

    state = u(state, {[action.name]: {$set: current + action.amount}})
  }
  else if (action.type === COLUMNS_WIDTH_CLEAR) {
    state = u(state, {[action.name]: {$set: 0}})
    delete state[action.name]
  }

  return state
}

export default columnsWidthReducer
