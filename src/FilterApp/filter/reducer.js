// import { u } from 'shared/lib/utils'
// import { decode } from 'shared/lib/b64FilterGenerator'
// import { getGames } from '../games'
// import filtersSectionsFlatSort from '../config/filtersSectionsFlatSort'
//
// import initialState from '../config/defaultFilter'
// import { filterSelector } from './selectors'
//
// // =============================================================================
// // Actions
// // =============================================================================
//
// export const TOGGLE = 'filter/TOGGLE'
// export const SET = 'filter/SET'
// export const SET_MULTI = 'filter/SET_MULTI'
// export const SORT = 'filter/SORT'
// export const SET_FULL = 'filter/SET_FULL'
// export const LOADING_FROM_SID = 'filter/LOADING_FROM_SID'
// export const LOADING_ERROR = 'filter/LOADING_ERROR'
// export const RESET = 'filter/RESET'
// export const SET_SHORTCUT = 'filter/SET_SHORTCUT'
// export const REMOVE_SHORTCUT = 'filter/REMOVE_SHORTCUT'
//
// export const DIRTY_ACTIONS = [
//   TOGGLE,
//   SET,
//   SET_MULTI,
//   SORT,
//   SET_FULL
// ]
//
// // =============================================================================
// // Helpers
// // =============================================================================
//
// function dispatchAndGetGames (action) {
//   return function (dispatch, getState) {
//     dispatch(action)
//     return getGames()(dispatch, getState)
//   }
// }
//
// // =============================================================================
// // Actions Creators
// // =============================================================================
//
// export function toggle (name, force = null) {
//   return { type: TOGGLE, name, force }
// }
//
// export function setParams (params) {
//   return dispatchAndGetGames({ type: SET_MULTI, params })
// }
//
// export function setShortcut (shortcut) {
//   return function (dispatch, getState) {
//     if (shortcut.params) {
//       dispatch({ type: SET_MULTI, params: shortcut.params })
//     }
//     if (shortcut.sort) {
//       dispatch({ type: SORT, name: shortcut.sort, asc: shortcut.sortAsc })
//     }
//     getGames()(dispatch, getState)
//   }
// }
//
// export function removeShortcut (shortcut) {
//
// }
//
// export function setParam (name, data) {
//   return function (dispatch, getState) {
//     if (getState().filter.visible.indexOf(name) === -1) {
//       dispatch(toggle(name, true))
//     }
//     dispatchAndGetGames({ type: SET, name, data })(dispatch, getState)
//   }
// }
//
// export const setFilter = setParam
//
// export function setSort (name, asc) {
//   return dispatchAndGetGames({ type: SORT, name, asc })
// }
//
// export function setFullFilter (filter) {
//   return dispatchAndGetGames({ type: SET_FULL, filter })
// }
//
// export function addTagFilter (tagId) {
//   return function (dispatch, getState) {
//     let tagsFilter = getState().filter.params.tags
//     let newTagsFilter = {}
//
//     if (tagsFilter) {
//       if (tagsFilter.tags.indexOf(tagId) !== -1) return
//       newTagsFilter.tags = tagsFilter.tags.concat([tagId])
//     } else {
//       newTagsFilter.tags = [tagId]
//     }
//
//     dispatch(setFilter('tags', newTagsFilter))
//   }
// }
//
// export function setFilterFromB64 (b64) {
//   return dispatchAndGetGames({ type: SET_FULL, filter: decode(b64) })
// }
//
// export function resetFilters () {
//   return dispatchAndGetGames({ type: RESET })
// }
//
// // =============================================================================
// // Reducer
// // =============================================================================
//
// export function reducer (state = initialState, action) {
//   switch (action.type) {
//     case TOGGLE:
//       let filtersNames = state.visible
//       let index = filtersNames.indexOf(action.name)
//       let currentlyActive = index !== -1
//       let useForce = !(action.force == null)
//       let shouldActive = useForce ? action.force : !currentlyActive
//
//       if (currentlyActive && !shouldActive) {
//         filtersNames = filtersNames.concat([])
//         filtersNames.splice(index, 1)
//       } else if (!currentlyActive && shouldActive) {
//         filtersNames = filtersSectionsFlatSort(filtersNames, action.name)
//       }
//       state = u(state, {visible: {$set: filtersNames}})
//       break
//
//     case SET:
//       let newParams = state.params[action.name] || {}
//       newParams = {...newParams, ...action.data}
//       state = u(state, {params: {[action.name]: {$set: newParams}}})
//       if (action.data == null) {
//         delete state.params[action.name]
//       }
//       break
//
//     case SET_MULTI:
//       state = u(state, {params: {$set: { ...state.params, ...action.params }}})
//       break
//
//     case SORT:
//       let asc = action.asc == null
//         ? (state.sort === action.name ? !state.sortAsc : true)
//         : action.asc
//       if (state.sort === action.name) {
//         state = u(state, {sortAsc: {$set: asc}})
//       } else {
//         state = u(state, {sort: {$set: action.name}, sortAsc: { $set: asc }})
//       }
//       break
//
//     case SET_FULL:
//       state = action.filter
//       break
//
//     case RESET:
//       state = initialState
//       break
//   }
//
//   return state
// }
