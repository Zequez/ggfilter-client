const gamesFetcher = require('sources/gamesFetcher')

/*** GAMES ACTIONS ***/
/*********************/

export const GET_GAMES_START = 'GET_GAMES_START'
export const GET_GAMES_END = 'GET_GAMES_END'
export const GET_GAMES_FAILED = 'GET_GAMES_FAILED'

export function getGames (page = 0) {
  return function (dispatch, getState) {
    let { filter, options } = getState()

    dispatch({type: GET_GAMES_START, page})

    return gamesFetcher(filter, page, options)
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

/*** COLUMNS WIDTH ACTIONS ***/
/*****************************/

export const COLUMNS_WIDTH_ADJUST = 'COLUMNS_WIDTH_ADJUST'
export const COLUMNS_WIDTH_CLEAR = 'COLUMNS_WIDTH_CLEAR'

export function adjustColumnWidth (name, amount) {
  return { type: COLUMNS_WIDTH_ADJUST, name, amount }
}

export function clearColumnWidth (name) {
  return { type: COLUMNS_WIDTH_ADJUST, name }
}

/*** LIGHTBOX ACTIONS ***/
/************************/

export const SHOW_LIGHTBOX = 'SHOW_LIGHTBOX'

export function showLightbox (media, thumbnails) {
  return { type: SHOW_LIGHTBOX, media, thumbnails }
}

/***** TAGS ACTIONS *****/
/************************/

export const SET_ALL_TAGS = 'SET_ALL_TAGS'

export function setAllTags (tags) {
  return { type: SET_ALL_TAGS, tags }
}
