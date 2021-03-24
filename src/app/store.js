import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { mediaQueryTracker } from 'redux-mediaquery'
import { router5Middleware } from 'redux-router5'
import middlewares from './middlewares'

import router from './router'
import reducer from './reducer'
import mediaQueries from './mediaQueries'


const middlewaresEnhancer = applyMiddleware(
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
