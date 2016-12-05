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
  aboutSysreq: 'aboutSysreq'
}

export const initialState = {
  mode: MODES.filter,
  routeName: null,
  drawerOpen: false
}

export const LAYOUT_SET_MODE = 'Layout/SET_MODE'
export const LAYOUT_RESET = 'Layout/RESET'
export const LAYOUT_ROUTE_CHANGE = 'Layout/ROUTE_CHANGE'
export const LAYOUT_DRAWER_OPEN = 'Layout/DRAWER_OPEN'
export const LAYOUT_DRAWER_CLOSE = 'Layout/DRAWER_CLOSE'

export const openDrawer = () => ({type: LAYOUT_DRAWER_OPEN})
export const closeDrawer = () => ({type: LAYOUT_DRAWER_CLOSE})

const reductions = {
  [LAYOUT_DRAWER_OPEN]: (s, a) => u(s, {drawerOpen: {$set: true}}),
  [LAYOUT_DRAWER_CLOSE]: (s, a) => u(s, {drawerOpen: {$set: false}})
}

export function reducer (state = initialState, action) {
  if (reductions.hasOwnProperty(action.type)) {
    return reductions[action.type](state, action)
  } else {
    return state
  }
}
