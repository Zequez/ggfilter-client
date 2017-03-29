import { u, createReducer, combineActions as ca } from 'shared/lib/utils/store'
import * as a from './actions'
import initialState from './initialState'

const reducers = {
  /********************/
  /* Filter stuff
  /********************/

  [a.RESET_FILTER]: (s) => u(s, {filter: {$set: initialState.filter}}),
  [a.SET_CONTROL]: (s, [control, visible]) =>
    u(s, {filter: {controlsList: {$toggle: [control, visible]}}}),
  // [ADD_CONTROL]: (s, p) => u(s, {filter: {controlsList: {$toggle: [p, true]}}}),
  // [REMOVE_CONTROL]: (s, p) => u(s, {
  //   filter: { controlsList: {$toggle: [p, false]} }
  // }),
  [a.SET_CONTROL_PARAMS]: (s, [control, params]) => params ? u(s, {
    filter: { controlsParams: { [control]: { $set: params } } }
  }) : u(s, {
    filter: { controlsParams: { $delete: control } }
  }),
  [a.SET_SORTING]: (s, [column, direction]) => u(s, {
    filter: {sorting: {column: {$set: column}, direction: {$set: direction}}}
  }),
  [a.SET_HL_MODE]: (s, [control, active]) =>
    u(s, {filter: {controlsHlMode: {$toggle: [control, active]}}}),

  /********************/
  /* SFilter management
  /********************/

  [a.SET_NAME]: (s, name) => u(s, {filter: {name: {$set: name}}}),

  ...ca(
    a.CREATE_SFILTER_REQUEST,
    a.UPDATE_SFILTER_REQUEST,
    a.SHOW_SFILTER_REQUEST,
    (s) => u(s, {sfilterLoading: {$set: true}})
  ),

  ...ca(
    a.CREATE_SFILTER_FAILURE,
    a.UPDATE_SFILTER_FAILURE,
    a.SHOW_SFILTER_FAILURE,
    (s, error) => u(s, {
      sfilterLoading: {$set: false},
      sfilterError: {$set: error}
    })
  ),

  ...ca(
    a.UPDATE_SFILTER_SUCCESS,
    a.SHOW_SFILTER_SUCCESS,
    (s, filter) => u(s, {
      sfilter: {$set: filter},
      sfilterError: {$set: null},
      sfilterLoading: {$set: false},
      filter: {$set: filter}
    })
  ),

  [a.CREATE_SFILTER_SUCCESS]: (s, filter) => {
    // This is a little unconventional but, whatever
    let secrets = window.localStorage.getItem('secrets')
    secrets = secrets ? JSON.parse(secrets) : {}
    secrets[filter.sid] = filter.secret
    window.localStorage.setItem('secrets', JSON.stringify(secrets))

    return reducers[a.UPDATE_SFILTER_SUCCESS](s, filter)
  },

  /********************/
  /* Front Page Filters
  /********************/

  [a.LOAD_FRONT_PAGE_FILTERS_SUCCESS]: (s, filters) => filters.length ? u(s, {
    sfilter: {$set: filters[0]},
    filter: {$set: filters[0]},
    frontPageFilters: {$set: filters}
  }) : s,

  /********************/
  /* Games
  /********************/

  [a.GET_GAMES_REQUEST]: (s, {page}) =>
    u(s, {games: {
      loading: {$set: true},
      totalCount: {$set: page === 0 ? null : s.games.totalCount}
    }}),
  [a.GET_GAMES_SUCCESS]: (s, {games, page, totalCount}) => {
    let stateChange = {games: {
      loading: {$set: false},
      error: {$set: null},
      totalCount: {$set: totalCount}
    }}
    if (page === 0) {
      stateChange.games.batches = {$set: [games]}
    } else {
      stateChange.games.batches = {$splice: [[page, 0, games]]}
    }
    return u(s, stateChange)
  },
  [a.GET_GAMES_FAILURE]: (s, error) => u(s, {
    games: {
      loading: {$set: false},
      error: {$set: error},
      totalCount: {$set: 0},
      batches: {$set: []}
    }
  })
}

export default createReducer(initialState, reducers)
