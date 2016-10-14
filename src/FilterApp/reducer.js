import { reducer as filter } from './filter'
import { reducer as games } from './games'
import { reducer as sfilter } from './sfilter'

import { reducer as columnsWidthReducer } from './columnsWidth/reducer'
import { NAME as columnsWidthName } from './columnsWidth/constants'

export default {
  filter,
  games,
  sfilter,
  [columnsWidthName]: columnsWidthReducer
}
