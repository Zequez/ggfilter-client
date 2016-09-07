import { u } from 'lib/utils'
import { getGames } from 'stores/actions'
import filtersSectionsFlatSort from 'sources/filtersSectionsFlatSort'

const initialState = {
  visible: [
    'steam_id',
    'name',
    // 'system_requirements',
    'lowest_steam_price',
    'steam_discount',
    'playtime_median_ftb',
    'metacritic',
    'steam_reviews_count',
    'steam_reviews_ratio',
    'platforms',
    'players',
    'vr',
    // 'steam_thumbnail',
    'tags',
    'playtime_median',
    'controller_support',
    // 'images'
    'sysreq_index_centile',
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
  sort_asc: false
}

initialState.visible = filtersSectionsFlatSort(initialState.visible)

export const FILTER_TOGGLE = 'FILTER_TOGGLE'
export const FILTER_SET = 'FILTER_SET'
export const FILTER_CLEAR = 'FILTER_CLEAR'
export const FILTER_SORT = 'FILTER_SORT'
export const FILTER_SET_FULL = 'FILTER_SET_FULL'

// Helpers

function dispatchAndGetGames (action) {
  return function (dispatch, getState) {
    dispatch(action)
    getGames()(dispatch, getState)
  }
}

// Actions creators

export function toggle (name, force = null) {
  return { type: FILTER_TOGGLE, name, force }
}

export function setFilter (name, data) {
  return dispatchAndGetGames({ type: FILTER_SET, name, data })
}

export function clearFilter (name) {
  return dispatchAndGetGames({ type: FILTER_CLEAR, name })
}

export function setSort (name) {
  return dispatchAndGetGames({ type: FILTER_SORT, name })
}

export function setFullFilter (filter) {
  return { type: FILTER_SET_FULL, filter }
}

export function addQueryTag (tagId) {
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
      state = u(state, {params: {[action.name]: {$set: action.data}}})
      break

    case FILTER_CLEAR:
      state = u(state, {params: {[action.name]: {$set: {}}}})
      delete state.params[action.name]
      break

    case FILTER_SORT:
      if (state.sort === action.name) {
        state = u(state, {sort_asc: {$set: !state.sort_asc}})
      } else {
        state = u(state, {sort: {$set: action.name}, sort_asc: { $set: true }})
      }
      break

    case FILTER_SET_FULL:
      state = action.filter
      break
  }

  return state
}
