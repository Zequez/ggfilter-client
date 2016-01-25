import React from 'react'
import ReactDOM from 'react-dom'

window.React = React

import { Router, Route, IndexRoute } from 'react-router'
import { createHistory } from 'history'
import { syncReduxAndRouter } from 'redux-simple-router'
import { Provider } from 'react-redux'

import { setAllTags } from 'stores/actions'
var store = require('stores/AppStore')
var routes = require('stores/routes')
var getTags = require('sources/getTags')

const App            = require('components/App')
const FiltersToggles = require('components/tabs/FiltersToggles')
const SourcesTab     = require('components/tabs/SourcesTab')
const SysreqCalc     = require('components/tabs/SysreqCalc')
const ShareTab       = require('components/tabs/ShareTab')

const history = createHistory()
syncReduxAndRouter(history, store)

getTags((tags)=>{
  store.dispatch(setAllTags(tags))

  // Render the main component into the dom
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={App}>
          <IndexRoute component={FiltersToggles}/>
          {/*<Route path='share'/>*/}
          <Route name='filtersToggles' path='columns' component={FiltersToggles}/>
          <Route name='sysreq' path='system-requirements' component={SysreqCalc}/>
          {/*<Route path='popular-filters'/>*/}
          {/*<Route path='email-alerts'/>*/}
          <Route name='sources' path='sources' component={SourcesTab}/>
          {/*<Route path='feedback'/>*/}
          {/*<Route path='sponsors'/>*/}
          <Route name='namedFilter' path='filter/:filterName' component={ShareTab}/>
          <Route name='filter' path='filter' component={ShareTab}/>
        </Route>
      </Router>
    </Provider>, document.getElementById('app')
  )
})
