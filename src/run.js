require('styles/run')

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import getStore from 'src/app/store'

import { getGamesIfNoGames } from 'src/FilterApp'
import { setAllTags } from 'shared/reducers/tagsReducer'
import { getCurrentUser } from 'shared/reducers/authReducer'

import history from 'shared/lib/StateRouter/history'
import router from 'sources/stateRoutes'

import App from 'components/App'
import { getTags } from 'sources/api'

console.logRender = function (componentName) {
  // console.info(`<${componentName}/>`)
}

let store
getTags().then((tags) => {
  store = getStore()
  store.dispatch(getCurrentUser()).then(() => {
    store.dispatch(setAllTags(tags))
    router.bind(store, history)

    router.dispatchInitialActions().then(() => {
      console.info('Finished initial loading of location-induced actions')
      store.dispatch(getGamesIfNoGames()).then(() => {
        renderWithHot(App)
      })
    })
  })
})

function renderWithHot (App) {
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>, document.getElementById('app')
  )
}

if (module.hot) {
  module.hot.accept('components/App', () => {
    const App = require('components/App').default
    renderWithHot(App)
  })
}

export default {}
