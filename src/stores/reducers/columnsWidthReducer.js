import { COLUMNS_WIDTH_ADJUST, COLUMNS_WIDTH_CLEAR } from 'stores/actions'
var initialState = require('stores/initialState').columnsWidth
var update = require('react-addons-update')

function columnsWidthReducer(state = initialState, action) {
  if (action.type === COLUMNS_WIDTH_ADJUST) {
    var current = state[action.name] || 0

    state = update(state, {[action.name]: {$set: current + action.amount}})
  }
  else if (action.type === COLUMNS_WIDTH_CLEAR) {
    state = update(state, {[action.name]: {$set: 0}})
    delete state[action.name]
  }

  return state
}

export default columnsWidthReducer
