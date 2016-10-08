import { combineReducers } from 'redux'

import columnsWidth from './columnsWidthReducer'
import lightbox from './lightboxReducer'
import tags from './tagsReducer'
const filterUrl = require('./filterUrlReducer').reducer
const games = require('./gamesReducer').reducer
const filter = require('./filterReducer').reducer
const options = require('./optionsReducer').reducer
const mode = require('./modeReducer').reducer
const sfilter = require('./sFilterReducer').reducer
const auth = require('./authReducer').reducer
const ui = require('./uiReducer').reducer

const reducer = combineReducers({
  mode,
  games,
  filter,
  columnsWidth,
  lightbox,
  tags,
  filterUrl,
  sfilter,
  options,
  auth,
  ui
})

export default reducer
