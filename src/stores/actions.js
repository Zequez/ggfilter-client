var connect = require('react-redux').connect
var qs = require('qs')
var filtersDefinitions = require('sources/filtersDefinitions')

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

/***** TAB ACTIONS *****/
/***********************/

export const SELECT_TAB = Symbol('SELECT_TAB')

export const Tabs = {
  FILTERS: Symbol('FILTERS'),
  SOURCES: Symbol('SOURCES'),
  FEEDBACK: Symbol('FEEDBACK'),
  DONATIONS: Symbol('DONATIONS')
}

export function selectTab(tab) {
  return { type: SELECT_TAB, tab }
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
    var filters = state.toggledFilters
    var query = state.query
    dispatch({type: GET_GAMES_START, page: page})

    // Get the columns to request
    var columns = []
    for (let i = 0; i < filters.length; ++i) {
      let columnInputs = filtersDefinitions[filters[i]].columnInputs
      for (let k in columnInputs) {
        columns.push(columnInputs[k])
      }
    }
    var sort_dir = query.sort_asc ? 'asc' : 'desc'
    var queryString = qs.stringify({
      filters: JSON.stringify(query.filters),
      sort: `${query.sort}_${sort_dir}`,
      limit: query.batchSize,
      columns: columns,
      page: page
    }, {arrayFormat: 'brackets'})

    return fetch(`http://localhost:3000/games.json?${queryString}`)
      .then(response => response.json())
      .then(json => {
        return dispatch({
          type: GET_GAMES_END,
          games: json,
          page: page,
          lastPage: json.length < state.query.batchSize})
      })
      .catch(error => dispatch({type: GET_GAMES_FAILED, page: page}))
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

/*** HELPERS ****/
/****************/

// export function connectActions(actions, component) {
//   return connect(null, function(dispatch) {
//     for(var action in actions) {
//       var prevAction = actions[action]
//       actions[action] = (...args)=> dispatch(prevAction(...args))
//     }
//     return actions
//   })
// }
