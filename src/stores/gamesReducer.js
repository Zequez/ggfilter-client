import { GET_GAMES_START, GET_GAMES_END, GET_GAMES_FAILED } from './actions'

const initialState = {
  batches: [],
  fetching: false,
  failed: false
}

function gamesReducer(state = initialState, action) {
  if (action.type == GET_GAMES_START) {
    state = _.clone(state)
    state.fetching = true
  }
  else if(action.type == GET_GAMES_END) {
    state = _.clone(state)
    state.fetching = false
    state.failed = false

    if (action.page == 0) {
      state.batches = []
    }
    state.batches[action.page] = action.games
  }
  else if(action.type == GET_GAMES_FAILED) {
    state = _.clone(state)
    state.fetching = false
    state.failed = true
  }

  return state
}

export default gamesReducer
