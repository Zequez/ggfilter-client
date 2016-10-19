import * as reducer from './reducer'
import * as selectors from './selectors'
import FiltersToggles from './components/FiltersToggles'

module.exports = {
  reducer: reducer.reducer,
  actions: reducer,
  selectors,
  FiltersToggles
}
