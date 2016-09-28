require('styles/run')

if (module.hot) module.hot.accept()

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { setAllTags } from 'stores/reducers/tagsReducer'
import { getGamesIfNoGames } from 'stores/reducers/gamesReducer'
import getStore from 'stores/AppStore'

import history from 'lib/StateRouter/history'
import router from 'sources/stateRoutes'

import App from 'components/App'
import getTags from 'sources/getTags'

console.logRender = function (componentName) {
  // console.info(`<${componentName}/>`)
}

getTags((tags) => {
  let store = getStore()

  store.dispatch(setAllTags(tags))

  router.bind(store, history).then(() => {
    console.info('Finished initial loading of location-induced actions')
    store.dispatch(getGamesIfNoGames()).then(() => {
      ReactDOM.render(
        <Provider store={store}>
          <App/>
        </Provider>, document.getElementById('app')
      )
    })
  })
})
