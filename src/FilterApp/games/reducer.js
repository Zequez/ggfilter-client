import { u } from 'shared/lib/utils'

import Api from 'shared/lib/Api'
import filterQuery from '../lib/filterStateToGamesQuery'

export const initialState = {
  batches: [],
  fetching: false,
  failed: false,
  totalCount: null
}

// =============================================================================
// Actions
// =============================================================================

export const GET_GAMES_START = 'FilterApp/games/START'
export const GET_GAMES_END = 'FilterApp/games/END'
export const GET_GAMES_FAILED = 'FilterApp/games/FAILED'

// =============================================================================
// Actions Creators
// =============================================================================

export function getGames (page = 0) {
  return function (dispatch, getState) {
    let state = getState()
    let options = state.options

    dispatch({type: GET_GAMES_START, page})

    let queryFilter = filterQuery(state, page, options)
    return Api.games.index(queryFilter)
      .then(({data, meta}) => {
        return dispatch({
          type: GET_GAMES_END,
          games: data,
          totalCount: Number(meta.paginationCount),
          page: page})
      }, (error) => {
        return dispatch({type: GET_GAMES_FAILED, page, error})
      })
  }
}

export function getMoreGames () {
  return function (dispatch, getState) {
    var state = getState()
    if (!state.games.lastPage) {
      var page = state.games.batches.length
      return getGames(page)(dispatch, getState)
    }
  }
}

export function getGamesIfNoGames () {
  return function (dispatch, getState) {
    let { games: { batches } } = getState()

    if (batches.length === 0) {
      return dispatch(getGames())
    } else {
      return Promise.resolve()
    }
  }
}

// =============================================================================
// Reducer
// =============================================================================

export function reducer (state = initialState, action) {
  if (action.type === GET_GAMES_START) {
    state = u(state, {
      fetching: {$set: true},
      totalCount: {$set: action.page === 0 ? null : state.totalCount}
    })
  } else if (action.type === GET_GAMES_END) {
    let stateChange = {
      fetching: {$set: false},
      failed: {$set: false},
      totalCount: {$set: action.totalCount}
    }

    if (action.page === 0) {
      stateChange.batches = {$set: [action.games]}
    } else {
      stateChange.batches = {$splice: [[action.page, 0, action.games]]}
    }

    state = u(state, stateChange)
  } else if (action.type === GET_GAMES_FAILED) {
    state = u(state, {
      fetching: {$set: false},
      failed: {$set: true},
      totalCount: {$set: 0}
    })
  }

  return state
}
