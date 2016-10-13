import FilterApp from './components/FilterApp'
import FilterTitle from './components/FilterTitle'
import reducer from './reducer'
import * as filter from './filter'
import * as games from './games'
import * as sfilter from './sfilter'

module.exports = {
  FilterApp,
  FilterTitle,
  reducer,

  toggleFilter: filter.toggle,
  setFilter: filter.setFilter,
  setSort: filter.setSort,
  resetFilter: filter.resetFilters,
  setFilterFromB64: filter.setFilterFromB64,

  getGamesIfNoGames: games.getGamesIfNoGames,

  loadFilter: sfilter.loadFilter,
  selectCurrentFilter: sfilter.selectCurrentFilter
}
