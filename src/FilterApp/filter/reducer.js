import { u } from 'shared/lib/utils'
import { createAction, handleAction } from 'redux-actions'
import frontPageFilter from './frontPageFilter'
import defaultFilter from './defaultFilter'
import { decode } from '../lib/filterEncoder'
import { combiner, deleteRedundantAttrs } from './lib/filterMutator'
const { getGames } = require('../games').actions

const initialState = {
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
  }
}

// =============================================================================
// Actions
// =============================================================================

export const MUTATE = 'filter/MUTATE'
export const RESET = 'filter/RESET'
export const SAVE = 'filter/SAVE'

export const SET_FILTER = 'filter/SET_FILTER'
export const SET_CONTROL = 'filter/SET_CONTROL'
export const ADD_CONTROL = 'filter/ADD_CONTROL'
export const REMOVE_CONTROL = 'filter/REMOVE_CONTROL'
export const SET_CONTROL_PARAMS = 'filter/SET_CONTROL_PARAMS'
export const ADD_COLUMN = 'filter/ADD_COLUMN'
export const REMOVE_COLUMN = 'filter/REMOVE_COLUMN'
export const SET_COLUMN_PARAMS = 'filter/SET_COLUMN_PARAMS'
export const SET_SORTING = 'filter/SET_SORTING'
export const SET_HL_MODE = 'filter/SET_HL_MODE'
export const SET_GLOBAL_CONFIG = 'filter/SET_GLOBAL_CONFIG'

// export const RENAME = 'filter/RENAME'

// =============================================================================
// Actions Creators
// =============================================================================

let filterAction = (type, payloadProcess = (v => v)) => (...payload) => ({
  type, payload: payloadProcess(...payload), dispatch: getGames()
})

export const setFilter = filterAction(SET_FILTER)
export const setControl = filterAction(SET_CONTROL,
  (control, visible) => [control, visible])
// export const addControl = filterAction(ADD_CONTROL)
// export const removeControl = filterAction(REMOVE_CONTROL)
export const setControlParams = filterAction(SET_CONTROL_PARAMS,
  (control, params) => ({ control, params }))
// export const addColumn = addControl
// export const removeColumn = removeControl
export const setColumn = setControl
export const setColumnParams = setControlParams

export const setSorting = filterAction(SET_SORTING,
  (column, direction) => [column, direction])
export const setHlMode = filterAction(SET_HL_MODE,
  (control, mode) => [control, mode])
export const setGlobalConfig = filterAction(SET_GLOBAL_CONFIG)

// export const addControl = (payload) =>
//   ({ type: ADD_CONTROL, payload, dispatch: getGames() })
// export const removeControl = (payload)
// export const reset = () => ({ type: RESET, dispatch: getGames() })
// export const mutate = (mask) => ({ type: MUTATE, mask, dispatch: getGames() })
// export const setParam = (name, value) => mutate({params: {[name]: value}})
// export const setSort = (name, asc) => mutate({sort: { filter: name, asc }})
// export const clearParam = (name) => setParam(name, true)

export const addTagFilter = (tagId) => (dispatch, getState) => {
  let tagsFilter = getState().filter.params.tags
  let newTagsFilter = {}

  if (tagsFilter) {
    if (tagsFilter.tags.indexOf(tagId) !== -1) return
    newTagsFilter.tags = tagsFilter.tags.concat([tagId])
  } else {
    newTagsFilter.tags = [tagId]
  }

  dispatch(setControlParams('tags', newTagsFilter))
}

// export const setFilterFromSid = (sid) => {
//
// }
// export const setFilterFromUrl = (params) => {
//   return setDelta(decode(params.encoded))
// }
// export const setDelta = (delta) => ({ type: SET_DELTA, delta, dispatch: getGames() })

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
  [SET_CONTROL]: (s, [control, visible]) =>
    u(s, {filter: {controlsList: {$toggle: [control, visible]}}}),
  // [ADD_CONTROL]: (s, p) => u(s, {filter: {controlsList: {$toggle: [p, true]}}}),
  // [REMOVE_CONTROL]: (s, p) => u(s, {
  //   filter: { controlsList: {$toggle: [p, false]} }
  // }),
  [SET_CONTROL_PARAMS]: (s, {control, params}) => params ? u(s, {
    filter: { controlsParams: { [control]: { $set: params } } }
  }) : u(s, {
    filter: { controlsParams: { $delete: control } }
  }),

  [SET_SORTING]: (s, [column, direction]) => u(s, {
    filter: {sorting: {column: {$set: column}, direction: {$set: direction}}}
  }),

  [SET_HL_MODE]: (s, [control, active]) =>
    u(s, {filter: {controlsHlMode: {$toggle: [control, active]}}}),
  // [SWITCH_BASE]: (s, a) => ({
  //   ...s,
  //   base: a.base,
  //   delta: deleteRedundantAttrs(combiner(s.base, s.delta), a.base)
  // }),
  // [MUTATE]: (s, a) => s.updateIn(['delta'], (ss) => ss.set(a.))
  //
  // ({
  //   ...s,
  //   combiner(s.delta, a.mask)
  // }),
  // [SET_DELTA]: (s, a) => ({
  //   ...s,
  //   delta: deleteRedundantAttrs(a.delta, s.base)
  // }),
  // [SET_BASE]: (s, a) => ({
  //   ...s,
  //   base: a.base,
  //   delta: initialState.delta
  // }),
  // [RESET]: (s, a) => initialState,
  // [SAVE]: () => {}
}

export function reducer (state = initialState, action) {
  return reducers[action.type]
    ? reducers[action.type](state, action.payload, action)
    : state
}
