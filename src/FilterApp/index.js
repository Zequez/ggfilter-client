import FilterApp from './components/FilterApp'
import FilterAppPage from './components/FilterAppPage'
import reducer from './reducer'
import routing from './routing'

const filter = require('./filter')

// import { encode, decode } from './lib/filterEncoder'

module.exports = {
  FilterApp,
  FilterAppPage,
  reducer,
  routing,
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
