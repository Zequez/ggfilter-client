import { GET_GAMES_START, GET_GAMES_END, GET_GAMES_FAILED } from 'stores/actions'
var initialState = require('stores/initialState').games

function gamesReducer(state = initialState, action) {
  if (action.type == GET_GAMES_START) {
    state = _.clone(state)
    state.fetching = true
    state.lastPage = false
  }
  else if(action.type == GET_GAMES_END) {
    state = _.clone(state)
    state.fetching = false
    state.failed = false
    state.lastPage = action.lastPage

    if (action.page == 0) {
      state.batches = []
    }

    state.batches[action.page] = action.games
  }
  else if(action.type == GET_GAMES_FAILED) {
    state = _.clone(state)
    state.fetching = false
    state.failed = true
    state.lastPage = true
  }

  return state
}

export default gamesReducer
