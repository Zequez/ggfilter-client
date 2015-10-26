import { combineReducers, createStore, applyMiddleware } from 'redux'
var tab = require('./tabActions')

const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

const crashReporter = store => next => action => {
  try {
    return next(action);
  } catch (err) {
    console.error('Caught an exception!', err);
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    });
    throw err;
  }
}

function toggledFilters(state = {}, action) {
  return state;
}

var reducer = combineReducers({ tab, toggledFilters })
var createStoreWithMiddleware = applyMiddleware(logger, crashReporter)(createStore)
var store = createStoreWithMiddleware(reducer)

export default store
