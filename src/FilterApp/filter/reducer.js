import { u } from 'lib/utils'
import { decode } from 'lib/b64FilterGenerator'
import { getGames } from '../games'

// import { dirty } from 'stores/reducers/filterUrlReducer'
import filtersSectionsFlatSort from '../config/filtersSectionsFlatSort'

export const initialState = {
  visible: [
    'steam_id',
    'name',
    // 'system_requirements',
    'lowest_steam_price',
    'steam_discount',
    'playtime_median_ftb',
    // 'metacritic',
    'steam_reviews_count',
    'steam_reviews_ratio',
    'platforms',
    'players',
    'vr',
    // 'steam_thumbnail',
    'tags',
    'playtime_median',
    // 'controller_support',
    // 'images'
    // 'sysreq_index_centile',
    'released_at'
  ],
  params: {
    // steam_reviews_count: { gt: 65 },
    // steam_reviews_ratio: { gt: 95 },
    // platforms: { value: 3 },
    // tags: { tags: [83] },
    // lowest_steam_price: { gt: 500, lt: 6000 }
  },
  sort: 'name',
  sortAsc: false
}

initialState.visible = filtersSectionsFlatSort(initialState.visible)

// =============================================================================
// Actions
// =============================================================================

export const FILTER_TOGGLE = 'FILTER_TOGGLE'
export const FILTER_SET = 'FILTER_SET'
export const FILTER_SORT = 'FILTER_SORT'
export const FILTER_SET_FULL = 'FILTER_SET_FULL'
export const FILTER_LOADING_FROM_SID = 'FILTER_LOADING_FROM_SID'
export const FILTER_LOADING_ERROR = 'FILTER_LOADING_ERROR'
export const FILTER_RESET = 'FILTER_RESET'

// Quick hack so we don't have a circular dependency, fix later
export const SFILTER_GET_SUCCESS = 'SFILTER_GET_SUCCESS'
export const SFILTER_LOAD = 'SFILTER_LOAD'

// =============================================================================
// Helpers
// =============================================================================

function dispatchAndGetGames (action) {
  return function (dispatch, getState) {
    dispatch(action)
    return getGames()(dispatch, getState)
  }
}

// =============================================================================
// Actions Creators
// =============================================================================

export function toggle (name, force = null) {
  return { type: FILTER_TOGGLE, name, force }
}

export function setFilter (name, data) {
  return function (dispatch, getState) {
    if (getState().filter.visible.indexOf(name) === -1) {
      dispatch(toggle(name, true))
    }
    dispatchAndGetGames({ type: FILTER_SET, name, data })(dispatch, getState)
  }
}

export function setSort (name, asc) {
  return dispatchAndGetGames({ type: FILTER_SORT, name, asc })
}

export function setFullFilter (filter) {
  return dispatchAndGetGames({ type: FILTER_SET_FULL, filter })
}

export function addTagFilter (tagId) {
  return function (dispatch, getState) {
    let tagsFilter = getState().filter.params.tags
    let newTagsFilter = {}

    if (tagsFilter) {
      if (tagsFilter.tags.indexOf(tagId) !== -1) return
      newTagsFilter.tags = tagsFilter.tags.concat([tagId])
    } else {
      newTagsFilter.tags = [tagId]
    }

    dispatch(setFilter('tags', newTagsFilter))
  }
}

export function setFilterFromB64 (b64) {
  return dispatchAndGetGames({ type: FILTER_SET_FULL, filter: decode(b64) })
}

export function resetFilters () {
  return dispatchAndGetGames({ type: FILTER_RESET })
}

// =============================================================================
// Reducer
// =============================================================================

export function reducer (state = initialState, action) {
  switch (action.type) {
    case FILTER_TOGGLE:
      let filtersNames = state.visible
      let index = filtersNames.indexOf(action.name)
      let currentlyActive = index !== -1
      let useForce = !(action.force == null)
      let shouldActive = useForce ? action.force : !currentlyActive

      if (currentlyActive && !shouldActive) {
        filtersNames = filtersNames.concat([])
        filtersNames.splice(index, 1)
      } else if (!currentlyActive && shouldActive) {
        filtersNames = filtersSectionsFlatSort(filtersNames, action.name)
      }
      state = u(state, {visible: {$set: filtersNames}})
      break

    case FILTER_SET:
      let newParams = state.params[action.name] || {}
      newParams = {...newParams, ...action.data}
      state = u(state, {params: {[action.name]: {$set: newParams}}})
      if (action.data == null) {
        delete state.params[action.name]
      }
      break

    case FILTER_SORT:
      if (state.sort === action.name) {
        state = u(state, {sortAsc: {$set: !state.sortAsc}})
      } else {
        let asc = action.asc == null ? true : action.asc
        state = u(state, {sort: {$set: action.name}, sortAsc: { $set: asc }})
      }
      break

    case FILTER_SET_FULL:
      state = action.filter
      break

    case FILTER_RESET:
      state = initialState
      break

    case SFILTER_GET_SUCCESS:
    case SFILTER_LOAD:
      state = JSON.parse(action.response.filter)
      break
  }

  return state
}
