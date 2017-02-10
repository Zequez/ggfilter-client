import { u, createReducer } from 'shared/lib/utils/store'
import * as a from './actions'
import initialState from './initialState'

export default createReducer(initialState, {
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
  [a.CREATE_SFILTER_REQUEST]: (s) => u(s, {sfilterLoading: {$set: true}}),
  [a.CREATE_SFILTER_FAILURE]: (s, error) => u(s, {
    sfilterLoading: {$set: false},
    sfilterError: {$set: error}
  }),
  [a.CREATE_SFILTER_SUCCESS]: (s, filter) => {
    // This is a little unconventional but, whatever
    let secrets = window.localStorage.getItem('secrets')
    secrets = secrets ? JSON.parse(secrets) : {}
    secrets[filter.sid] = filter.secret
    window.localStorage.setItem('secrets', JSON.stringify(secrets))

    return u(s, {
      sfilter: {$set: filter},
      sfilterError: {$set: null},
      sfilterLoading: {$set: false},
      filter: {$set: filter}
    })
  },

  [a.UPDATE_SFILTER_REQUEST]: (s) => u(s, {sfilterLoading: {$set: true}}),
  [a.UPDATE_SFILTER_FAILURE]: (s, error) => u(s, {
    sfilterLoading: {$set: false},
    sfilterError: {$set: error}
  }),
  [a.UPDATE_SFILTER_SUCCESS]: (s, filter) => u(s, {
    sfilter: {$set: filter},
    sfilterError: {$set: null},
    sfilterLoading: {$set: false},
    filter: {$set: filter}
  }),

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
})
