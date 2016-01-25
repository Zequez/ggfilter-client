import { u } from 'lib/utils'
import { GET_GAMES_START, GET_GAMES_END, GET_GAMES_FAILED } from 'stores/actions'
import { games as initialState } from 'stores/initialState'

export default function gamesReducer(state = initialState, action) {
  if (action.type === GET_GAMES_START) {
    state = u(state, {
      fetching: {$set: true},
      lastPage: {$set: false},
    })
  }
  else if(action.type === GET_GAMES_END) {
    let stateChange = {
      fetching: {$set: false},
      failed: {$set: false},
      lastPage: {$set: action.lastPage},
    }

    if (action.page === 0) {
      stateChange.batches = {$set: [action.games]}
    } else {
      stateChange.batches = {$splice: [[action.page, 0, action.games]]}
    }

    state = u(state, stateChange)
  }
  else if(action.type === GET_GAMES_FAILED) {
    state = u(state, {
      fetching: {$set: false},
      failed: {$set: true},
      lastPage: {$set: true},
    })
  }

  return state
}
