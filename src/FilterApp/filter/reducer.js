import frontPageFilter from './frontPageFilter'
import defaultFilter from './defaultFilter'
import { decode } from '../lib/filterEncoder'
import { combiner, deleteRedundantAttrs } from './lib/filterMutator'
const { getGames } = require('../games').actions

const initialState = {
  // baseSid: '',
  base: frontPageFilter,
  delta: {
    params: {},
    sort: {}
  }

  // loaded: {
  //
  // },
  // active: {
  //   name: 'Name of your filter',
  //   filters: {},
  //   sorting: {},
  //   columns: [
  //     'steam_id',
  //     'name',
  //     'stores_prices'
  //   ],
  //   config: {
  //     stores: ['steam', 'oculus']
  //   }
  // },
  // gamesBatches: {
  //
  // }

}

// =============================================================================
// Actions
// =============================================================================

export const SWITCH_BASE = 'filter/SWITCH_BASE'
export const SET_BASE = 'filter/SET_BASE'
export const SET_DELTA = 'filter/SET_DELTA'
export const MUTATE = 'filter/MUTATE'
export const RESET = 'filter/RESET'
export const SAVE = 'filter/SAVE'
// export const RENAME = 'filter/RENAME'

// =============================================================================
// Actions Creators
// =============================================================================

export const setBase = (base) => ({ type: SET_BASE, base, dispatch: getGames() })
export const reset = () => ({ type: RESET, dispatch: getGames() })
export const mutate = (mask) => ({ type: MUTATE, mask, dispatch: getGames() })
export const setParam = (name, value) => mutate({params: {[name]: value}})
export const setSort = (name, asc) => mutate({sort: { filter: name, asc }})
export const clearParam = (name) => setParam(name, true)
export const switchBase = (base) => ({ type: SWITCH_BASE, base })

export const addTagFilter = (tagId) => (dispatch, getState) => {
  let tagsFilter = getState().filter.params.tags
  let newTagsFilter = {}

  if (tagsFilter) {
    if (tagsFilter.tags.indexOf(tagId) !== -1) return
    newTagsFilter.tags = tagsFilter.tags.concat([tagId])
  } else {
    newTagsFilter.tags = [tagId]
  }

  dispatch(setParam('tags', newTagsFilter))
}

export const setFilterFromUrl = (params) => {
  return setDelta(decode(params.encoded))
}
export const setDelta = (delta) => ({ type: SET_DELTA, delta, dispatch: getGames() })

// =============================================================================
// Reducer
// =============================================================================

const fromFrontPage = (s) => {
  if (s.base === frontPageFilter) {
    return {
      base: defaultFilter,
      delta: deleteRedundantAttrs(frontPageFilter, defaultFilter)
    }
  } else {
    return s
  }
}

const reducers = {
  [SWITCH_BASE]: (s, a) => ({
    ...s,
    base: a.base,
    delta: deleteRedundantAttrs(combiner(s.base, s.delta), a.base)
  }),
  [MUTATE]: (s, a) => ({
    ...s,
    delta: deleteRedundantAttrs(combiner(s.delta, a.mask), s.base)
  }),
  [SET_DELTA]: (s, a) => ({
    ...s,
    delta: deleteRedundantAttrs(a.delta, s.base)
  }),
  [SET_BASE]: (s, a) => ({
    ...s,
    base: a.base,
    delta: initialState.delta
  }),
  [RESET]: (s, a) => initialState,
  [SAVE]: () => {}
}

export function reducer (state = initialState, action) {
  if (action.type === MUTATE || action.type === SET_DELTA) {
    if (state.base === frontPageFilter) {
      state = reducers[SWITCH_BASE](state, switchBase(defaultFilter))
    }
  }

  return reducers[action.type]
    ? reducers[action.type](state, action)
    : state
}
