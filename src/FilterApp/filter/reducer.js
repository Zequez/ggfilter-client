import { u } from 'shared/lib/utils'
import { decode } from '../lib/filterEncoder'
// import defaultFilter from '../config/defaultFilter'
const { getGames } = require('../games').actions
import masks from '../config/masks'
import staticFilters from '../config/staticFilters'

import { maskedFilterSelector } from './selectors'
import { combiner, deleteRedundantAttrs, isMaskFullyOverriden, removeAttrsInMask } from './lib/filterMutator'
import initialState from './initialState'

// =============================================================================
// Actions
// =============================================================================

export const SET = 'filter/SET'
export const MUTATE = 'filter/MUTATE'
export const RESET = 'filter/RESET'
export const ADD_MASK = 'filter/ADD_MASK'
export const REMOVE_MASK = 'filter/REMOVE_MASK'
export const SET_STATIC = 'filter/SET_STATIC'

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
export const setFilterFromStatic = (slug) => {
  if (staticFilters[slug]) {
    return { type: SET_STATIC, slug, dispatch: getGames() }
  }
}

// =============================================================================
// Reducer
// =============================================================================

function deleteRedundant (state, maskedFilter) {
  return deleteRedundantAttrs(state, maskedFilter)
}

function removeOverridenMasks (state) {
  let masksNames = state.masks
  masksNames.forEach((name) => {
    if (isMaskFullyOverriden(masks[name], state)) {
      masksNames = removeMaskName(masksNames, name)
    }
  })
  state.masks = masksNames
  return state
}

function removeMaskName (masks, mask) {
  masks = masks.concat([])
  masks.splice(masks.indexOf(mask), 1)
  return masks
}

export function reducer (state = initialState, action) {
  switch (action.type) {
    case SET:
      state = action.filter
      break
    case MUTATE:
      // We call it with the original state so it doesn't recompute al pedo
      let maskedFilter = maskedFilterSelector(state, true)
      state = combiner(state, action.mask)
      if (state.staticSlug) state.staticSlug = null
      state = deleteRedundant(state, maskedFilter)
      state = removeOverridenMasks(state)
      break
    case RESET:
      state = initialState
      break
    case ADD_MASK:
      state = {...state, masks: state.masks.concat(action.mask), staticSlug: null}
      state = removeAttrsInMask(state, maskedFilterSelector(state, true))
      break
    case REMOVE_MASK:
      let masksNames = removeMaskName(state.masks, action.mask)
      state = {...state, masks: masksNames, staticSlug: null}
      state = deleteRedundant(state, maskedFilterSelector(state, true))
      break
    case SET_STATIC:
      state = u(staticFilters[action.slug].filter, {
        masks: {$set: []},
        staticSlug: {$set: action.slug}
      })

      break
  }

  return state
}
