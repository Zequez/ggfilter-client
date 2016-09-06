const gamesFetcher = require('sources/gamesFetcher')


if (true) { // Dev
  var Symbol = function(key){
    return key
  }
}
else {
  var Symbol = Symbol || (function(){
    var i = 0;
    return function(){
      return (i++).toString(36)
    }
  })()
}

/*** FILTERS TOGGLES ACTIONS ****/
/********************************/

export const TOGGLE_FILTER = Symbol('TOGGLE_FILTER')

export function toggleFilter(filter, force = null) {
  return { type: TOGGLE_FILTER, filter, force }
}

/*** QUERY ACTIONS ***/
/*********************/


export const SET_QUERY_FILTER = Symbol('SET_QUERY_FILTER')
export const REMOVE_QUERY_FILTER = Symbol('REMOVE_QUERY_FILTER')
export const SET_QUERY_SORT = Symbol('SET_QUERY_SORT')
export const SET_QUERY_BATCH_SIZE = Symbol('SET_QUERY_BATCH_SIZE')
export const SET_FULL_QUERY = Symbol('SET_FULL_QUERY')

export function setQueryFilter(name, data) {
  return dispatchAndGetGames({ type: SET_QUERY_FILTER, name, data })
}

export function removeQueryFilter(name) {
  return dispatchAndGetGames({ type: REMOVE_QUERY_FILTER, name })
}

export function setQuerySort(name) {
  return dispatchAndGetGames({ type: SET_QUERY_SORT, name })
}

export function setQueryBatchSize(size) {
  return { type: SET_QUERY_BATCH_SIZE, size }
}

export function setFullQuery (query) {
  return { type: SET_FULL_QUERY, query }
}

export function addQueryTag(tagId) {
  return function(dispatch, getState) {
    let tagsFilter = getState().query.filters.tags
    let newTagsFilter = {}

    if (tagsFilter) {
      if (tagsFilter.tags.indexOf(tagId) !== -1) return
      newTagsFilter.tags = tagsFilter.tags.concat([tagId])
    }
    else {
      newTagsFilter.tags = [tagId]
    }

    dispatch(setQueryFilter('tags', newTagsFilter))
  }
}

function dispatchAndGetGames(action) {
  return function(dispatch, getState) {
    dispatch(action)
    getGames()(dispatch, getState)
  }
}

/*** GAMES ACTIONS ***/
/*********************/

export const GET_GAMES_START = Symbol('GET_GAMES_START')
export const GET_GAMES_END = Symbol('GET_GAMES_END')
export const GET_GAMES_FAILED = Symbol('GET_GAMES_FAILED')

export function getGames(page = 0) {
  return function(dispatch, getState) {
    var state = getState()
    dispatch({type: GET_GAMES_START, page: page})

    return gamesFetcher(state.toggledFilters, state.query, page)
      .then(json => {
        return dispatch({
          type: GET_GAMES_END,
          games: json,
          page: page,
          lastPage: json.length < state.query.batchSize})
      })
      .catch(error => {
        return dispatch({type: GET_GAMES_FAILED, page: page})
      })
  }
}

export function getMoreGames() {
  return function(dispatch, getState) {
    var state = getState()
    if (!state.games.lastPage) {
      var page = state.games.batches.length
      return getGames(page)(dispatch, getState)
    }
  }
}

/*** COLUMNS WIDTH ACTIONS ***/
/*****************************/

export const COLUMNS_WIDTH_ADJUST = Symbol('COLUMNS_WIDTH_ADJUST')
export const COLUMNS_WIDTH_CLEAR = Symbol('COLUMNS_WIDTH_CLEAR')

export function adjustColumnWidth(name, amount) {
  return { type: COLUMNS_WIDTH_ADJUST, name, amount }
}

export function clearColumnWidth(name) {
  return { type: COLUMNS_WIDTH_ADJUST, name }
}

/*** LIGHTBOX ACTIONS ***/
/************************/

export const SHOW_LIGHTBOX = Symbol('SHOW_LIGHTBOX')

export function showLightbox(media, thumbnails) {
  return { type: SHOW_LIGHTBOX, media, thumbnails }
}

/***** TAGS ACTIONS *****/
/************************/

export const SET_ALL_TAGS = Symbol('SET_ALL_TAGS')

export function setAllTags(tags) {
  return { type: SET_ALL_TAGS, tags }
}
