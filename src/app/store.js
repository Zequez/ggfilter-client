import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { mediaQueryTracker } from 'redux-mediaquery'
import { routerForBrowser } from 'redux-little-router'
import logger from './middlewares/logger'
// import crashReporter from './middlewares/crashReporter'
import callAPI from './middlewares/callAPI'
import andDispatch from './middlewares/andDispatch'

import reducer from './reducer'
import routes from './littleRoutes'

const { routerEnhancer, routerMiddleware } = routerForBrowser({ routes })

const store = createStore(reducer, {}, compose(
  routerEnhancer,
  applyMiddleware(routerMiddleware, thunkMiddleware, callAPI, andDispatch, logger), //crashReporter
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

store.dispatch(mediaQueryTracker({
  isPhone: 'screen and (max-width: 767px)',
  isTablet: 'screen and (max-width: 1024px) and (min-width: 768px)',
  isDesktop: 'screen and (max-width: 1600px) and (min-width: 1025)',
  isBigDesktop: 'screen and (min-width: 1601px)',
  innerWidth: true,
  innerHeight: true
}))

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducer', () => {
    const nextRootReducer = require('./reducer').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store
