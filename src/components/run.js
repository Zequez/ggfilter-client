import React from 'react'
import ReactDOM from 'react-dom'

window.React = React
window._ = require('lodash')

import { Router, Route, IndexRoute } from 'react-router'
import { createHistory } from 'history'
import { syncReduxAndRouter } from 'redux-simple-router'

var App = require('./App')
var Provider = require('react-redux').Provider
var store = require('stores/AppStore')
import { setAllTags } from 'stores/actions'
var routes = require('stores/routes')
var getTags = require('sources/getTags')

var FiltersToggles = require('components/tabs/FiltersToggles')
var SourcesTab = require('components/tabs/SourcesTab')
var SysreqCalc = require('components/tabs/SysreqCalc')

const history = createHistory()
syncReduxAndRouter(history, store)

getTags((tags)=>{
  store.dispatch(setAllTags(tags))

  // Render the main component into the dom
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path='' component={App}>
          <IndexRoute component={FiltersToggles}/>
          {/*<Route path='share'/>*/}
          <Route name='filtersToggles' path='columns' component={FiltersToggles}/>
          <Route name='sysreq' path='system-requirements' component={SysreqCalc}/>
          {/*<Route path='popular-filters'/>*/}
          {/*<Route path='email-alerts'/>*/}
          <Route name='sources' path='sources' component={SourcesTab}/>
          {/*<Route path='feedback'/>*/}
          {/*<Route path='sponsors'/>*/}
          <Route name='namedFilter' path='filter/:filterName'/>
          <Route name='filter' path='filter'/>
        </Route>
      </Router>
      {/*<App tags={tags}/>*/}
    </Provider>, document.getElementById('app')
  )
})
