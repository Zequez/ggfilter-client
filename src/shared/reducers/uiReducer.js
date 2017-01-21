import { u } from 'shared/lib/utils'

export const MODES = {
  filter: 'filter',
  sysreq: 'sysreq',
  officialFilters: 'officialFilters',
  feedback: 'feedback',
  contribute: 'contribute',
  login: 'login',
  sources: 'sources',
  myFilters: 'myFilters',
  tos: 'tos',
  help: 'help',
  about: 'about',
  contact: 'contact',
  aboutSysreq: 'aboutSysreq',
  logs: 'logs'
}

// =============================================================================
// Initial state
// =============================================================================

export const initialState = {
  filterLockedInView: false,
  mode: MODES.filter,
  routeName: null
}

// =============================================================================
// Actions
// =============================================================================

export const UI_SET_MODE = 'UI_SET_MODE'
export const UI_LOCK_FILTER_INTO_VIEW = 'UI_LOCK_FILTER_INTO_VIEW'
export const UI_UNLOCK_FILTER_FROM_VIEW = 'UI_UNLOCK_FILTER_FROM_VIEW'
export const UI_RESET = 'UI_RESET'

export const UI_ROUTE_CHANGE = 'UI_ROUTE_CHANGE'

// =============================================================================
// Action Creators
// =============================================================================

export const setMode = (mode) => ({ type: UI_SET_MODE, mode })
export const lockFilterIntoView = (lock = true) => ({
  type: UI_LOCK_FILTER_INTO_VIEW,
  lock
})
export const unlockFilterFromView = () => ({ type: UI_UNLOCK_FILTER_FROM_VIEW })
export const resetUi = () => ({ type: UI_RESET })

// =============================================================================
// Reducer
// =============================================================================

let reductions = {
  [UI_SET_MODE]: (s, a) => (
    u(s, {
      mode: { $set: a.mode },
      filterLockedInView: { $set: a.mode === MODES.filter || s.filterLockedInView }
    })
  ),
  [UI_LOCK_FILTER_INTO_VIEW]: (s, a) => u(s, { filterLockedInView: { $set: a.lock } }),
  [UI_UNLOCK_FILTER_FROM_VIEW]: (s) => u(s, { filterLockedInView: { $set: false } }),
  [UI_RESET]: (s) => initialState,

  [UI_ROUTE_CHANGE]: (s, {route, stateInduced, location}) => (
    u(s, { routeName: {$set: route.name} })
  )
}

export function reducer (state = initialState, action) {
  if (reductions.hasOwnProperty(action.type)) {
    return reductions[action.type](state, action)
  } else {
    return state
  }
}
