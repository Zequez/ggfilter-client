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

/***** TABS *****/
/****************/

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

/*** FILTERS ****/
/****************/

export const TOGGLE_FILTER = Symbol('TOGGLE_FILTER')

export function toggleFilter(filter, force = null) {
  return { type: TOGGLE_FILTER, filter, force }
}

/*** REQUESTS ***/
/****************/

export const GET_GAMES_START = Symbol('GET_GAMES_START')
export const GET_GAMES_END = Symbol('GET_GAMES_END')
export const GET_GAMES_FAILED = Symbol('GET_GAMES_FAILED')

export function getGames(filters) {
  return function(dispatch) {
    dispatch({type: GET_GAMES_START})

    return fetch('http://localhost:3000/games.json')
      .then(response => response.json())
      .then(json => dispatch({type: GET_GAMES_END, games: json}))
      .catch(error => dispatch({type: GET_GAMES_FAILED}))
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
