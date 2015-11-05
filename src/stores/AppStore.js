import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { logger, crashReporter } from './storeMiddleware'
import tab from './tabReducer'
import toggledFilters from './toggledFiltersReducer'
import requests from './toggledFiltersReducer'
import games from './gamesReducer'
import query from './queryReducer'

var reducer = combineReducers({ tab, toggledFilters, games, query })
var createStoreWithMiddleware = applyMiddleware(thunkMiddleware, logger, crashReporter)(createStore)
var store = createStoreWithMiddleware(reducer)

var exampleState = {
  tab: 'filter',
  toggledFilters: ['steam_id', 'steam_price', 'metascore', 'steam_reviews_count'],
  games: {
    batches: [[{}, {}, {}, {}]],
    fetching: false,
    failed: false
  },
  query: {
    filters: {
      name: { value: 'civ', filter: true, highlight: false }
    },
    sort: [],
    batchSize: 20
  }
}

export default store
