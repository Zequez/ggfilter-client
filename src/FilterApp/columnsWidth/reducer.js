import { u } from 'lib/utils'

export const initialState = {}

// =============================================================================
// Actions
// =============================================================================

export const ADJUST = 'columnsWidth/ADJUST'
export const CLEAR = 'columnsWidth/CLEAR'

// =============================================================================
// Actions Creators
// =============================================================================

export function adjustColumnWidth (name, amount) {
  return { type: ADJUST, name, amount }
}

export function clearColumnWidth (name) {
  return { type: ADJUST, name }
}

// =============================================================================
// Reducer
// =============================================================================

export function reducer (state = initialState, action) {
  if (action.type === ADJUST) {
    var current = state[action.name] || 0

    state = u(state, {[action.name]: {$set: current + action.amount}})
  } else if (action.type === CLEAR) {
    state = u(state, {[action.name]: {$set: 0}})
    delete state[action.name]
  }

  return state
}
