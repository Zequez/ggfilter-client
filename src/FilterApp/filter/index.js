import reducer from './reducer'
import * as actions from './actions'
import * as selectors from './selectors'
import * as sagas from './sagas'

module.exports = {
  ID: selectors.ID,
  reducer,
  actions,
  selectors,
  sagas
}
