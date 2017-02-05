import { reducer as filter, ID as filterID } from './filter'
import { reducer as games, ID as gamesID } from './games'

// import { reducer as sfilter } from './sfilter'

// export default function (state, action) {
//   state[filterName] = filter(state[filterName], action, state)
// }

export default {
  [filterID]: filter,
  [gamesID]: games
}
