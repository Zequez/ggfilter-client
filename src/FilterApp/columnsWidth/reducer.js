import { u } from 'lib/utils'

export const initialState = {}

// =============================================================================
// Actions
// =============================================================================

export const COLUMNS_WIDTH_ADJUST = 'COLUMNS_WIDTH_ADJUST'
export const COLUMNS_WIDTH_CLEAR = 'COLUMNS_WIDTH_CLEAR'

// =============================================================================
// Actions Creators
// =============================================================================

export function adjustColumnWidth (name, amount) {
  return { type: COLUMNS_WIDTH_ADJUST, name, amount }
}

export function clearColumnWidth (name) {
  return { type: COLUMNS_WIDTH_ADJUST, name }
}

// =============================================================================
// Reducer
// =============================================================================

export function reducer (state = initialState, action) {
  if (action.type === COLUMNS_WIDTH_ADJUST) {
    var current = state[action.name] || 0

    state = u(state, {[action.name]: {$set: current + action.amount}})
  } else if (action.type === COLUMNS_WIDTH_CLEAR) {
    state = u(state, {[action.name]: {$set: 0}})
    delete state[action.name]
  }

  return state
}
