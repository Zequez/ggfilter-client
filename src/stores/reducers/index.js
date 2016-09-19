import { combineReducers } from 'redux'

import columnsWidth from './columnsWidthReducer'
import lightbox from './lightboxReducer'
import tags from './tagsReducer'
const filterUrl = require('./filterUrlReducer').reducer
const games = require('./gamesReducer').reducer
const filter = require('./filterReducer').reducer
const options = require('./optionsReducer').reducer
const mode = require('./modeReducer').reducer

const reducer = combineReducers({ mode, games, filter, columnsWidth, lightbox, tags, filterUrl, options })

export default reducer
