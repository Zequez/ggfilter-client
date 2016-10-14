import { u } from 'shared/lib/utils'

export const TABS = {
  none: 'none',
  columns: 'columns',
  share: 'share'
}

export const initialState = {
  columnsWidth: {},
  tab: TABS.none
}

// =============================================================================
// Actions
// =============================================================================

export const ADJUST_COLUMN = 'FilterApp/ui/ADJUST_COLUMN_WIDTH'
export const CLEAR_COLUMN = 'FilterApp/ui/CLEAR_COLUMN_WIDTH'
export const SET_TAB = 'FilterApp/ui/SET_TAB'

// =============================================================================
// Actions Creators
// =============================================================================

export function adjustColumnWidth (name, amount) {
  return { type: ADJUST_COLUMN, name, amount }
}

export function clearColumnWidth (name) {
  return { type: CLEAR_COLUMN, name }
}

export function setTab (tab) {
  return { type: SET_TAB, tab }
}

// =============================================================================
// Reducer
// =============================================================================

export function reducer (state = initialState, action) {
  switch (action.type) {
    case ADJUST_COLUMN:
      let current = state.columnsWidth[action.name] || 0
      state = u(state, {columnsWidth: {[action.name]: {$set: current + action.amount}}})
      break
    case CLEAR_COLUMN:
      state = u(state, {columnsWidth: {[action.name]: {$set: 0}}})
      delete state.columnsWidth[action.name]
      break
    case SET_TAB:
      state = u(state, {tab: {$set: action.tab}})
      break
  }

  return state
}
