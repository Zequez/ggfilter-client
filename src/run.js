require('shared/lib/polyfills')

require('autotrack/lib/plugins/clean-url-tracker')
require('autotrack/lib/plugins/outbound-link-tracker')
require('autotrack/lib/plugins/url-change-tracker')

import './style'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from 'src/app/store'

import { setAllTags } from 'shared/reducers/tagsReducer'
import { actions as filterAppActions } from 'src/FilterApp';
// import { getCurrentUser } from 'shared/reducers/authReducer'

import App from 'src/app/App'
import Api from 'src/Api'

console.logRender = function (componentName) {
  // console.info(`<${componentName}/>`)
}

Promise.all([Api.tags.index()]).then(([tags]) => {
  store.dispatch(setAllTags(tags));
  renderWithHot(App);
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
  // module.hot.dispose(() => {
  //   router.unbind()
  // })
}

export default {}
