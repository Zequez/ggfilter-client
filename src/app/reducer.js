import { combineReducers } from 'redux'
import { router5Reducer } from 'redux-router5'
import { reducer as responsive } from 'redux-mediaquery'

import { reducer as layout } from 'src/Layout/reducer'
import { ID as layoutId } from 'src/Layout/selectors'

import tags from 'shared/reducers/tagsReducer'
const auth = require('shared/reducers/authReducer').reducer
const ui = require('shared/reducers/uiReducer').reducer
// import * as SavedFiltersManager from 'src/SavedFiltersManager'
import * as FilterApp from 'src/FilterApp'
import * as Lightbox from 'src/Lightbox'

const reducer = combineReducers({
  router: router5Reducer,
  responsive,
  tags,
  auth,
  ui,
  [Lightbox.ID]: Lightbox.reducer,
  // [SavedFiltersManager.constants.NAME]: SavedFiltersManager.reducer,
  [layoutId]: layout,
  ...FilterApp.reducer
})

export default reducer
