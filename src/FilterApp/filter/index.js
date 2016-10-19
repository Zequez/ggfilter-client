import * as reducer from './newReducer'
import * as selectors from './newSelectors'
import FiltersToggles from './components/FiltersToggles'

module.exports = {
  ...reducer,
  reducer: reducer.reducer,
  actions: reducer,
  selectors,
  FiltersToggles
}
