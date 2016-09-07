import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { logger, crashReporter } from './storeMiddleware'

import games from './reducers/gamesReducer'
import columnsWidth from './reducers/columnsWidthReducer'
import lightbox from './reducers/lightboxReducer'
import tags from './reducers/tagsReducer'
import filterUrl from './reducers/filterUrlReducer'
const routing = require('./reducers/routingReducer').reducer
const filter = require('./reducers/filterReducer').reducer
const options = require('./reducers/optionsReducer').reducer

export default function getStore () {
  let reducer = combineReducers({ games, filter, columnsWidth, lightbox, routing, tags, filterUrl, options })
  let createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    logger
  )(createStore) //crashReporter
  return createStoreWithMiddleware(reducer, {})
}
