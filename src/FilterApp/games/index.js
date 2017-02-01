const reducer = require('./reducer')
import * as selectors from './selectors'

module.exports = {
  ID: selectors.ID,
  selectors,
  reducer: reducer.reducer,
  actions: reducer
}
