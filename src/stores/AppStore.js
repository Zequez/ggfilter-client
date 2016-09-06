import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { logger, crashReporter } from './storeMiddleware'

import toggledFilters from './reducers/toggledFiltersReducer'
import games from './reducers/gamesReducer'
import query from './reducers/queryReducer'
import columnsWidth from './reducers/columnsWidthReducer'
import lightbox from './reducers/lightboxReducer'
import tags from './reducers/tagsReducer'
import filterUrl from './reducers/filterUrlReducer'
const routing = require('./reducers/routingReducer').reducer

export default function getStore () {
  let reducer = combineReducers({ toggledFilters, games, query, columnsWidth, lightbox, routing, tags, filterUrl })
  let createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    logger
  )(createStore) //crashReporter
  return createStoreWithMiddleware(reducer, {})
}
