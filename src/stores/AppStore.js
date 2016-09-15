import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { logger, crashReporter } from './storeMiddleware'

import columnsWidth from './reducers/columnsWidthReducer'
import lightbox from './reducers/lightboxReducer'
import tags from './reducers/tagsReducer'
const filterUrl = require('./reducers/filterUrlReducer').reducer
const games = require('./reducers/gamesReducer').reducer
const filter = require('./reducers/filterReducer').reducer
const options = require('./reducers/optionsReducer').reducer
const mode = require('./reducers/modeReducer').reducer

export default function getStore () {
  let reducer = combineReducers({ mode, games, filter, columnsWidth, lightbox, tags, filterUrl, options })
  return createStore(reducer, {}, compose(
    applyMiddleware(thunkMiddleware, logger), //crashReporter
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))
}
