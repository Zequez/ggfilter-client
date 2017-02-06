import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { mediaQueryTracker } from 'redux-mediaquery'
import { routerForBrowser } from 'redux-little-router'
import createSagaMiddleware from 'redux-saga'
import middlewares from './middlewares'

import reducer from './reducer'
import routes from './routes'

import { sagas as filterAppSagas } from '../FilterApp'

const { routerEnhancer, routerMiddleware } = routerForBrowser({ routes })
const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, {}, compose(
  routerEnhancer,
  applyMiddleware(sagaMiddleware, thunkMiddleware, ...middlewares, routerMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

sagaMiddleware.run(filterAppSagas)

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
