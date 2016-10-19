// import { u } from 'shared/lib/utils'
import { decode } from 'shared/lib/b64FilterGenerator'
// import { getGames } from '../games'
// import filtersSectionsFlatSort from '../config/filtersSectionsFlatSort'

import defaultFilter from '../config/defaultFilter'

// import { filterSelector } from './selectors'

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

const deprecate = (fun, warn) => (...args) => {
  console.warn(`Deprecated function ${warn}`)
  return fun(...args)
}

// =============================================================================
// Actions Creators
// =============================================================================

export const reset = () => ({ type: RESET })
export const mutate = (mask) => ({ type: MUTATE, mask })
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

// Deprecated names
export const setFilter = deprecate(setParam, 'setFilter, use setParam')
export const toggle = deprecate(setParam, 'toggle, use setParam')
export const setFullFilter = deprecate(mutate, 'setFullFilter, use mutate')
export const resetFilters = deprecate(reset, 'resetFilters, use reset')
export const autoToggle = (name) => (dispatch, getState) => {
  let { params } = getState()
  return dispatch(params[name]
    ? toggle(name, false)
    : toggle(name, true)
  )
}

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
