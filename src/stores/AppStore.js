import { combineReducers, createStore, applyMiddleware } from 'redux'
import { logger, crashReporter } from './storeMiddleware'
import { SELECT_TAB, Tabs } from './actions'

function tab(state = Tabs.FILTERS, action) {
  if(action.type == SELECT_TAB && Tabs[action.tab]) {
    return action.tab
  }
  else {
    return state
  }
}

function toggledFilters(state = {}, action) {
  return state;
}

var reducer = combineReducers({ tab, toggledFilters })
var createStoreWithMiddleware = applyMiddleware(logger, crashReporter)(createStore)
var store = createStoreWithMiddleware(reducer)

export default store
