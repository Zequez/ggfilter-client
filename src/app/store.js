import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { mediaQueryTracker } from 'redux-mediaquery'
import createSagaMiddleware from 'redux-saga'
import { router5Middleware } from 'redux-router5'
import middlewares from './middlewares'

import router from './router'
import reducer from './reducer'
import sagas from './sagas'
import mediaQueries from './mediaQueries'

const sagaMiddleware = createSagaMiddleware()

const middlewaresEnhancer = applyMiddleware(
  sagaMiddleware,
  thunkMiddleware,
  ...middlewares,
  router5Middleware(router)
)

const devToolsEnhancer = window.devToolsExtension
  ? window.devToolsExtension()
  : f => f

const storeEnhancers = [
  middlewaresEnhancer,
  devToolsEnhancer
]

const store = createStore(reducer, {}, compose(...storeEnhancers))

sagaMiddleware.run(sagas)
store.dispatch(mediaQueryTracker(mediaQueries))
router.start()

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducer', () => {
    const nextRootReducer = require('./reducer').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store
