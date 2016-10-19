import { u } from 'shared/lib/utils'

import { getGames as apiGetGames } from 'shared/lib/api'
import gamesQueryGenerator from '../lib/gamesQueryGenerator'
import { filterSelector } from '../filter/selectors'

export const initialState = {
  batches: [],
  fetching: false,
  failed: false,
  lastPage: false
}

// =============================================================================
// Actions
// =============================================================================

export const GET_GAMES_START = 'GET_GAMES_START'
export const GET_GAMES_END = 'GET_GAMES_END'
export const GET_GAMES_FAILED = 'GET_GAMES_FAILED'

// =============================================================================
// Actions Creators
// =============================================================================

export function getGames (page = 0) {
  return function (dispatch, getState) {
    let state = getState()
    // let filter = filterSelector(state)
    let options = state.options

    dispatch({type: GET_GAMES_START, page})

    let queryFilter = gamesQueryGenerator(state, page, options)
    return apiGetGames(queryFilter)
      .then(games => {
        return dispatch({
          type: GET_GAMES_END,
          games: games,
          page: page,
          lastPage: games.length < options.batchSize})
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
      lastPage: {$set: false}
    })
  } else if (action.type === GET_GAMES_END) {
    let stateChange = {
      fetching: {$set: false},
      failed: {$set: false},
      lastPage: {$set: action.lastPage}
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
      lastPage: {$set: true}
    })
  }

  return state
}
