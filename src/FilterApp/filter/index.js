import reducer from './reducer'
import * as actions from './actions'
import * as selectors from './selectors'

module.exports = {
  ID: selectors.ID,
  reducer,
  actions,
  selectors
}
