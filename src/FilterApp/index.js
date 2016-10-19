import FilterApp from './components/FilterApp'
import FilterTitle from './components/FilterTitle'
import reducer from './reducer'

const filter = require('./filter')
const games = require('./games')

import * as sfilter from './sfilter'
import * as ui from './ui'

module.exports = {
  FilterApp,
  FilterTitle,
  reducer,

  actions: {
    setParam: filter.actions.setParam,
    setSort: filter.actions.setSort,
    setFilterFromB64: filter.actions.setFilterFromB64,
    resetFilter: filter.actions.reset,
    getGamesIfNoGames: games.actions.getGamesIfNoGames
  },

  editMode: ui.editMode,

  loadFilter: sfilter.loadFilter,
  selectCurrentFilter: sfilter.selectCurrentFilter
}
