import FilterApp from './components/FilterApp'
import FilterAppPage from './components/FilterAppPage'
import reducer from './reducer'
import routing from './routing'

const filter = require('./filter')
const games = require('./games')

import * as ui from './ui'

// import { encode, decode } from './lib/filterEncoder'

module.exports = {
  FilterApp,
  FilterAppPage,
  reducer,
  routing,

  actions: {
    setParam: filter.actions.setParam,
    setSort: filter.actions.setSort,
    setFilterFromB64: filter.actions.setFilterFromB64,
    resetFilter: filter.actions.reset,
    getGamesIfNoGames: games.actions.getGamesIfNoGames
  },

  lib: {

  },

  editMode: ui.editMode
}
