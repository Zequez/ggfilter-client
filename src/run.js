require('src/app/style')

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import getStore from 'src/app/store'
import router from 'src/app/routes'

import { getGamesIfNoGames } from 'src/FilterApp'
import { setAllTags } from 'shared/reducers/tagsReducer'
import { getCurrentUser } from 'shared/reducers/authReducer'

import history from 'shared/lib/StateRouter/history'

import App from 'src/app/components/App'
import { getTags } from 'shared/lib/api'

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
  module.hot.accept('src/app/components/App', () => {
    const App = require('src/app/components/App').default
    renderWithHot(App)
  })
}

export default {}
