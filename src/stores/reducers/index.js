import { combineReducers } from 'redux'

import lightbox from './lightboxReducer'
import tags from './tagsReducer'
const options = require('./optionsReducer').reducer
const mode = require('./modeReducer').reducer
const auth = require('./authReducer').reducer
const ui = require('./uiReducer').reducer
import * as SavedFiltersManager from 'src/SavedFiltersManager'
import * as FilterApp from 'src/FilterApp'

console.log(FilterApp)

const reducer = combineReducers({
  mode,
  lightbox,
  tags,
  options,
  auth,
  ui,
  [SavedFiltersManager.constants.NAME]: SavedFiltersManager.reducer,
  ...FilterApp.reducer
})

export default reducer
