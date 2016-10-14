import { reducer as filter } from './filter'
import { reducer as games } from './games'
import { reducer as sfilter } from './sfilter'

import { reducer as ui } from './ui/reducer'
import { NAME as uiName } from './ui/constants'

export default {
  filter,
  games,
  sfilter,
  [uiName]: ui
}
