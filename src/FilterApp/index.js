import FilterApp from './components/FilterApp'
import FilterTitle from './components/FilterTitle'
import reducer from './reducer'
import * as filter from './filter'

module.exports = {
  FilterApp,
  FilterTitle,
  reducer,
  toggleFilter: filter.toggle,
  setFilter: filter.setFilter,
  setSort: filter.setSort,
  resetFilter: filter.resetFilters,
  setFilterFromB64: filter.setFilterFromB64
}
