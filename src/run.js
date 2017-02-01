require('shared/lib/polyfills')

require('autotrack/lib/plugins/clean-url-tracker')
require('autotrack/lib/plugins/outbound-link-tracker')
require('autotrack/lib/plugins/url-change-tracker')

import './style'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { initializeCurrentLocation, provideRouter } from 'redux-little-router'

import store from 'src/app/store'
// import router from 'src/app/routes'

import { setAllTags } from 'shared/reducers/tagsReducer'
import { getCurrentUser } from 'shared/reducers/authReducer'

import App from 'src/app/App'
import { getTags } from 'shared/lib/api'

console.logRender = function (componentName) {
  // console.info(`<${componentName}/>`)
}

getTags().then((tags) => {
  store.dispatch(getCurrentUser()).then(() => {
    store.dispatch(setAllTags(tags))
    const initialLocation = store.getState().router
    if (initialLocation) {
      store.dispatch(initializeCurrentLocation(initialLocation))
    }
    renderWithHot(App)
  })
})

function renderWithHot (App) {
  const AppWithRouter = provideRouter({store})(App)
  ReactDOM.render(
    <Provider store={store}>
      <AppWithRouter/>
    </Provider>, document.getElementById('app')
  )
}

// if (module.hot) {
//   module.hot.accept()
//   module.hot.dispose(() => {
//     router.unbind()
//   })
// }

export default {}
