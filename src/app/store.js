import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from './middlewares/logger'
// import crashReporter from './middlewares/crashReporter'
import callAPI from './middlewares/callAPI'

import reducer from './reducer'

const store = createStore(reducer, {}, compose(
  applyMiddleware(thunkMiddleware, callAPI, logger), //crashReporter
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducer', () => {
    const nextRootReducer = require('./reducer').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store
