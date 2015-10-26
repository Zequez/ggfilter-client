var React = require('react')
var ReactDOM = require('react-dom')
var App = require('./App')
var Provider = require('react-redux').Provider
var store = require('stores/AppStore')

// Render the main component into the dom

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
