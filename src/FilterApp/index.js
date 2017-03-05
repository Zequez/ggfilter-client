import FilterApp from './components/FilterApp'
import FilterAppPage from './components/FilterAppPage'
import RedirectToCurrentFilter from './components/RedirectToCurrentFilter'
import reducer from './reducer'

const filter = require('./filter')

module.exports = {
  FilterApp,
  FilterAppPage,
  RedirectToCurrentFilter,
  reducer,
  sagas: filter.sagas,

  actions: {
    setControl: filter.actions.setControl,
    setControlParams: filter.actions.setControlParams,
    setSorting: filter.actions.setSorting,
    resetFilter: filter.actions.reset
  },

  lib: {

  }
}
