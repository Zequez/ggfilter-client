import { reducer as filter } from './filter'
import { NAME as filterName } from './filter/constants'

import { reducer as games } from './games'

import { reducer as sfilter } from './sfilter'

import { reducer as ui } from './ui/reducer'
import { NAME as uiName } from './ui/constants'

export default {
  [filterName]: filter,
  games,
  sfilter,
  [uiName]: ui
}
