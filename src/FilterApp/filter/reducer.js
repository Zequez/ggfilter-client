import { u } from 'shared/lib/utils'

import * as a from './actions'

const initialState = {
  sfilter: null,
  sfilterError: null,
  sfilterLoading: false,

  // sfilter: {
  //   sid: '',
  //   slug: '',
  //   name: '',
  //   encoded: '',
  //   secret: '' // Only really exist when you just created it
  //   global_slug: null,
  //   front_page: null,
  // },
  // loading: false,
  // dirty: false,
  // error: false,
  filter: {
    name: 'Name of your filter',

    controlsList: [
      'name', 'tags', 'released_at',
      'lowest_price', 'best_discount',
      'playtime_median', 'ratings_pct'
    ],
    controlsHlMode: ['lowest_price'],
    controlsParams: {
      best_discount: {gt: 1, lt: null}
    },
    columnsList: [
      'name', 'tags', 'released_at',
      'lowest_price',
      'playtime_median', 'ratings_pct'
    ],
    columnsParams: {},
    sorting: {
      column: 'ratings_pct',
      direction: true,
      nullFirst: false
    },
    globalConfig: {
      stores: ['steam', 'oculus'],
      currency: 'USD',
      region: 'US'
    }
  },

  games: {
    batches: [],
    loading: false,
    error: null,
    totalCount: null
  }
}

// =============================================================================
// Reducer
// =============================================================================

u.extend('$toggle', ([item, val], arr) => {
  let i = arr.indexOf(item)
  if ((i === -1 && !val) || (i !== -1 && val)) return arr
  if (val) {
    return arr.concat(item)
  } else {
    arr = arr.concat([])
    arr.splice(i, 1)
    return arr
  }
})

u.extend('$delete', (key, obj) => {
  obj = { ...obj }
  delete obj[key]
  return obj
})

const reducers = {
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

export default function reducer (state = initialState, action) {
  return reducers[action.type]
    ? reducers[action.type](state, action.payload, action)
    : state
}
