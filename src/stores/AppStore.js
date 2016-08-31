import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { logger, crashReporter } from './storeMiddleware'
import { syncHistoryWithStore, routerReducer as routing} from 'react-router-redux'
import { browserHistory } from 'react-router'

import toggledFilters from './reducers/toggledFiltersReducer'
import games from './reducers/gamesReducer'
import query from './reducers/queryReducer'
import columnsWidth from './reducers/columnsWidthReducer'
import lightbox from './reducers/lightboxReducer'
import tags from './reducers/tagsReducer'

var reducer = combineReducers({ toggledFilters, games, query, columnsWidth, lightbox, routing, tags })
var createStoreWithMiddleware = applyMiddleware(thunkMiddleware, logger)(createStore) //crashReporter
var store = createStoreWithMiddleware(reducer, {})

syncHistoryWithStore(browserHistory, store)

export var history
export var store
