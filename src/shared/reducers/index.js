import { combineReducers } from 'redux'

import tags from './tagsReducer'
const options = require('./optionsReducer').reducer
const auth = require('./authReducer').reducer
const ui = require('./uiReducer').reducer
import * as SavedFiltersManager from 'src/SavedFiltersManager'
import * as FilterApp from 'src/FilterApp'
import * as Lightbox from 'src/Lightbox'

const reducer = combineReducers({
  tags,
  options,
  auth,
  ui,
  [Lightbox.constants.NAME]: Lightbox.reducer,
  [SavedFiltersManager.constants.NAME]: SavedFiltersManager.reducer,
  ...FilterApp.reducer
})

export default reducer
