// import { u } from 'shared/lib/utils'
import { decode } from 'shared/lib/b64FilterGenerator'
import defaultFilter from '../config/defaultFilter'
// console.log(require('../games'))
const { getGames } = require('../games').actions

import { combiner, deleteDefaultsFromMask } from './lib/filterMutator'

const initialState = {
  params: {},
  sort: {}
}

// =============================================================================
// Actions
// =============================================================================

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

// =============================================================================
// Reducer
// =============================================================================

export function reducer (state = initialState, action) {
  switch (action.type) {
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
