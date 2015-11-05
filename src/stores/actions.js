var connect = require('react-redux').connect

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

export function setQueryFilter(name, filter, highlight, data) {
  return { type: SET_QUERY_FILTER, name, filter, highlight, data }
}

export function removeQueryFilter(name) {
  return { type: REMOVE_QUERY_FILTER, name }
}

export function setQuerySort(name) {
  return { type: SET_QUERY_SORT, name }
}

export function setQueryBatchSize(size) {
  return { type: SET_QUERY_BATCH_SIZE, size }
}

/*** GAMES ACTIONS ***/
/*********************/

export const GET_GAMES_START = Symbol('GET_GAMES_START')
export const GET_GAMES_END = Symbol('GET_GAMES_END')
export const GET_GAMES_FAILED = Symbol('GET_GAMES_FAILED')

export function getGames(filters, page = 0) {
  return function(dispatch) {
    dispatch({type: GET_GAMES_START, page: page})

    return fetch('http://localhost:3000/games.json')
      .then(response => response.json())
      .then(json => dispatch({type: GET_GAMES_END, games: json, page: page}))
      .catch(error => dispatch({type: GET_GAMES_FAILED, page: page}))
  }
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
