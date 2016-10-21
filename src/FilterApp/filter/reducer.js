// import { u } from 'shared/lib/utils'
import { decode } from '../lib/filterEncoder'
import defaultFilter from '../config/defaultFilter'
const { getGames } = require('../games').actions
const masks = require('../config/masks')

import { maskedFilterSelector } from './selectors'
import { combiner, deleteRedundantAttrs } from './lib/filterMutator'
import initialState from './initialState'

// =============================================================================
// Actions
// =============================================================================

export const SET = 'filter/SET'
export const MUTATE = 'filter/MUTATE'
export const RESET = 'filter/RESET'
export const ADD_MASK = 'filter/ADD_MASK'
export const REMOVE_MASK = 'filter/REMOVE_MASK'

export const DIRTY_ACTIONS = [
  MUTATE
]

// =============================================================================
// Helpers
// =============================================================================

// =============================================================================
// Actions Creators
// =============================================================================

export const addMask = (mask) => ({ type: ADD_MASK, mask })
export const removeMask = (mask) => ({ type: REMOVE_MASK, mask })
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

export const setFilterFromB64 = (b64) => set(decode(b64))
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
      let maskedFilter = maskedFilterSelector(state, true)
      deleteRedundantAttrs(state, maskedFilter)
      break
    case RESET:
      state = initialState
      break
    case ADD_MASK:
      state = {...state, masks: state.masks.concat(action.mask)}
      break
    case REMOVE_MASK:
      let masks = state.masks.concat([])
      masks.splice(state.masks.indexOf(action.mask), 1)
      state = {...state, masks: masks}
      break
  }

  return state
}
