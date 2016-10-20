import FilterApp from './components/FilterApp'
import FilterTitle from './components/FilterTitle'
import reducer from './reducer'

const filter = require('./filter')
const games = require('./games')

import * as sfilter from './sfilter'
import * as ui from './ui'

import { encode, decode } from './lib/filterEncoder'

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

  lib: {
    encode,
    decode
  },

  editMode: ui.editMode,

  loadFilter: sfilter.loadFilter,
  selectCurrentFilter: sfilter.selectCurrentFilter
}
