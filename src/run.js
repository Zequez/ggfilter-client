require('src/app/style')
require('shared/lib/polyfills')

require('autotrack/lib/plugins/clean-url-tracker')
require('autotrack/lib/plugins/outbound-link-tracker')
require('autotrack/lib/plugins/url-change-tracker')

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from 'src/app/store'
import router from 'src/app/routes'

const { getGamesIfNoGames } = require('src/FilterApp').actions
import { setAllTags } from 'shared/reducers/tagsReducer'
import { getCurrentUser } from 'shared/reducers/authReducer'

import history from 'shared/lib/SelectorRouter/history'

import App from 'src/app/components/App'
import { getTags } from 'shared/lib/api'

console.logRender = function (componentName) {
  // console.info(`<${componentName}/>`)
}

getTags().then((tags) => {
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
  module.hot.accept()
  module.hot.dispose(() => {
    router.unbind()
  })
}

export default {}
