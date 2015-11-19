import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { logger, crashReporter } from './storeMiddleware'

import tab            from './reducers/tabReducer'
import toggledFilters from './reducers/toggledFiltersReducer'
import games          from './reducers/gamesReducer'
import query          from './reducers/queryReducer'
import columnsWidth   from './reducers/columnsWidthReducer'
import lightbox       from './reducers/lightboxReducer'
import tags           from './reducers/tagsReducer'

var reducer = combineReducers({ tab, toggledFilters, games, query, columnsWidth, lightbox, tags })
var createStoreWithMiddleware = applyMiddleware(thunkMiddleware, logger)(createStore) //crashReporter
var store = createStoreWithMiddleware(reducer)

export default store
