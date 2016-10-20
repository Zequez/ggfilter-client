// import { u } from 'shared/lib/utils'
import { decode } from '../lib/filterEncoder'
import defaultFilter from '../config/defaultFilter'
const { getGames } = require('../games').actions

import { combiner, deleteDefaultsFromMask } from './lib/filterMutator'

const initialState = {
  params: {},
  sort: {}
}

// =============================================================================
// Actions
// =============================================================================

export const SET = 'filter/SET'
export const MUTATE = 'filter/MUTATE'
export const RESET = 'filter/RESET'

export const DIRTY_ACTIONS = [
  MUTATE
]

// =============================================================================
// Helpers
// =============================================================================

// =============================================================================
// Actions Creators
// =============================================================================

export const reset = () => ({ type: RESET, dispatch: getGames() })
export const mutate = (mask) => ({ type: MUTATE, mask, dispatch: getGames() })
export const setParam = (name, value) => mutate({params: {[name]: value}})
export const setSort = (name, asc) => mutate({sort: { column: name, asc }})

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

export const setFilterFromB64 = (b64) => mutate(decode(b64))
export const set = (filter) => ({ type: SET, filter, dispatch: getGames() })

// =============================================================================
// Reducer
// =============================================================================

export function reducer (state = initialState, action) {
  switch (action.type) {
    case SET:
      state = action.filter
      break
    case MUTATE:
      state = combiner(state, action.mask)
      deleteDefaultsFromMask(state, defaultFilter)
      break
    case RESET:
      state = initialState
      break
  }

  return state
}
