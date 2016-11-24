import { reducer as filter } from './filter'
import { NAME as filterName } from './filter/constants'

import { reducer as games } from './games'
import { NAME as gamesName } from './games/constants'

// import { reducer as sfilter } from './sfilter'

import { reducer as ui } from './ui/reducer'
import { NAME as uiName } from './ui/constants'

// export default function (state, action) {
//   state[filterName] = filter(state[filterName], action, state)
// }

export default {
  [filterName]: filter,
  [gamesName]: games,
  // sfilter,
  [uiName]: ui
}
