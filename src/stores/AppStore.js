import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { logger, crashReporter } from './storeMiddleware'
import tab from './tabReducer'
import toggledFilters from './toggledFiltersReducer'
import requests from './toggledFiltersReducer'
import games from './gamesReducer'

var reducer = combineReducers({ tab, toggledFilters, games })
var createStoreWithMiddleware = applyMiddleware(thunkMiddleware, logger, crashReporter)(createStore)
var store = createStoreWithMiddleware(reducer)

export default store
