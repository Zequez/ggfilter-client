import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from './middlewares/logger'
import crashReporter from './middlewares/crashReporter'
import callAPI from './middlewares/callAPI'

import reducer from './reducers/index'

export default function getStore () {
  let store = createStore(reducer, {}, compose(
    applyMiddleware(thunkMiddleware, callAPI, logger), //crashReporter
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
