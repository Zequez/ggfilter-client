import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { receiveRoute } from 'stores/reducers/routingReducer'

const App = require('components/App')
const FiltersToggles = require('components/tabs/FiltersToggles')
const SourcesTab  = require('components/tabs/SourcesTab')
const SysreqCalc = require('components/tabs/SysreqCalc')
const ShareTab = require('components/tabs/ShareTab')
const FilterTab = require('components/tabs/FilterTab')

export function getRoutes (store, history) {
  function syncRouterWithStoreChange (prevState, nextState) {
    return syncRouterWithStore(nextState)
  }
  function syncRouterWithStore (nextState) {
    store.dispatch(receiveRoute(nextState))
  }

  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={App} onEnter={syncRouterWithStore} onChange={syncRouterWithStoreChange}>
          <IndexRoute component={FiltersToggles}/>
          <Route name='sysreq' path='system-requirements' component={SysreqCalc}/>
          <Route name='sources' path='sources' component={SourcesTab}/>
          <Route name='share' path='share' component={ShareTab}/>
          {/*<Route path='popular-filters'/>*/}
          {/*<Route path='email-alerts'/>*/}
          {/*<Route path='feedback'/>*/}
          {/*<Route path='sponsors'/>*/}
          <Route name='b64Filter' path='b/:filterName' component={FilterTab}/>
          <Route name='idFilter' path='f/:filterName' component={FilterTab}/>
        </Route>
      </Router>
    </Provider>
  )
}
