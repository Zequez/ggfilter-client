window.React = require('react')
window._ = require('lodash')
var ReactDOM = require('react-dom')
var App = require('./App')
var Provider = require('react-redux').Provider
var store = require('stores/AppStore')
var getTags = require('sources/getTags')

getTags((tags)=>{
  // Render the main component into the dom
  ReactDOM.render(
    <Provider store={store}>
      <App tags={tags}/>
    </Provider>,
    document.getElementById('app')
  )
})
