import FilterApp from './components/FilterApp'
import FilterAppPage from './components/FilterAppPage'
import TitleGenerator from './components/TitleGenerator'
import reducer from './reducer'

const filter = require('./filter')
const games = require('./games')

import * as sfilter from './sfilter'
import * as ui from './ui'

// import { encode, decode } from './lib/filterEncoder'

module.exports = {
  FilterApp,
  TitleGenerator,
  FilterAppPage,
  reducer,

  actions: {
    setParam: filter.actions.setParam,
    setSort: filter.actions.setSort,
    setFilterFromB64: filter.actions.setFilterFromB64,
    resetFilter: filter.actions.reset,
    getGamesIfNoGames: games.actions.getGamesIfNoGames
  },

  lib: {

  },

  editMode: ui.editMode,

  loadFilter: sfilter.loadFilter,
  selectCurrentFilter: sfilter.selectCurrentFilter
}
