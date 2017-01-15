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
}

// =============================================================================
// Actions
// =============================================================================

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

export const setFilterFromB64 = (b64) => setDelta(decode(b64))
export const setDelta = (delta) => ({ type: SET_DELTA, delta, dispatch: getGames() })

// =============================================================================
// Reducer
// =============================================================================

const reducers = {
  [MUTATE]: (s, a) => {
    return {
      ...s,
      delta: deleteRedundantAttrs(combiner(s.delta, a.mask), s.base)
    }
  },
  [SET_DELTA]: (s, a) => ({
    ...s,
    delta: deleteRedundantAttrs(a.delta, s.base)
  }),
  [SET_BASE]: (s, a) => ({
    ...s,
    delta: deleteRedundantAttrs(s.delta, a.base),
    base: a.base
  }),
  [RESET]: (s, a) => initialState,
  [SAVE]: () => {}
}

export function reducer (state = initialState, action) {
  return reducers[action.type]
    ? reducers[action.type](state, action)
    : state
}
